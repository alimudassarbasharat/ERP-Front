import { ref, onUnmounted } from 'vue'

export function useWebRTC() {
  const localStream = ref(null)
  const remoteStream = ref(null)
  const peerConnection = ref(null)
  const isCallActive = ref(false)
  const callType = ref(null) // 'audio' or 'video'

  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }

  const createPeerConnection = () => {
    peerConnection.value = new RTCPeerConnection(configuration)

    if (localStream.value) {
      localStream.value.getTracks().forEach(track => {
        peerConnection.value.addTrack(track, localStream.value)
      })
    }

    peerConnection.value.ontrack = (event) => {
      remoteStream.value = event.streams[0]
    }

    peerConnection.value.onicecandidate = (event) => {
      if (event.candidate) {
        return {
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid
        }
      }
      return null
    }
  }

  const startLocalStream = async (type = 'video') => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } : false
      }

      localStream.value = await navigator.mediaDevices.getUserMedia(constraints)
      callType.value = type
      return localStream.value
    } catch (error) {
      console.error('Error accessing media devices:', error)
      throw error
    }
  }

  const stopLocalStream = () => {
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => track.stop())
      localStream.value = null
    }
  }

  const createOffer = async () => {
    if (!peerConnection.value) {
      createPeerConnection()
    }

    const offer = await peerConnection.value.createOffer()
    await peerConnection.value.setLocalDescription(offer)
    
    return {
      type: offer.type,
      sdp: offer.sdp
    }
  }

  const createAnswer = async (offer) => {
    if (!peerConnection.value) {
      createPeerConnection()
    }

    await peerConnection.value.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await peerConnection.value.createAnswer()
    await peerConnection.value.setLocalDescription(answer)
    
    return {
      type: answer.type,
      sdp: answer.sdp
    }
  }

  const setRemoteDescription = async (description) => {
    if (peerConnection.value) {
      await peerConnection.value.setRemoteDescription(new RTCSessionDescription(description))
    }
  }

  const addIceCandidate = async (candidate) => {
    if (peerConnection.value && candidate) {
      try {
        await peerConnection.value.addIceCandidate(new RTCIceCandidate(candidate))
      } catch (error) {
        console.error('Error adding ICE candidate:', error)
      }
    }
  }

  const endCall = () => {
    if (peerConnection.value) {
      peerConnection.value.close()
      peerConnection.value = null
    }
    stopLocalStream()
    remoteStream.value = null
    isCallActive.value = false
    callType.value = null
  }

  onUnmounted(() => {
    endCall()
  })

  return {
    localStream,
    remoteStream,
    isCallActive,
    callType,
    startLocalStream,
    stopLocalStream,
    createPeerConnection,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
    endCall
  }
}
