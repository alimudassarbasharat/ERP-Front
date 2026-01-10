export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export const getFileIcon = (mimeType) => {
  if (mimeType?.startsWith('image/')) return '🖼️'
  if (mimeType?.startsWith('video/')) return '🎥'
  if (mimeType?.startsWith('audio/')) return '🎵'
  if (mimeType === 'application/pdf') return '📄'
  if (mimeType?.includes('word') || mimeType?.includes('document')) return '📝'
  if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return '📊'
  return '📎'
}

export const isImage = (mimeType) => {
  return mimeType?.startsWith('image/')
}

export const isVideo = (mimeType) => {
  return mimeType?.startsWith('video/')
}

export const isAudio = (mimeType) => {
  return mimeType?.startsWith('audio/')
}

export const isDocument = (mimeType) => {
  const docTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ]
  return docTypes.includes(mimeType)
}

export const validateFile = (file, maxSize = 50 * 1024 * 1024) => {
  if (file.size > maxSize) {
    throw new Error(`File size exceeds maximum allowed size of ${formatFileSize(maxSize)}`)
  }
  
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/quicktime',
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ]
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed')
  }
  
  return true
}

export const createFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    if (isImage(file.type)) {
      reader.onload = (e) => resolve({
        type: 'image',
        url: e.target.result,
        file
      })
      reader.onerror = reject
      reader.readAsDataURL(file)
    } else if (isVideo(file.type)) {
      reader.onload = (e) => resolve({
        type: 'video',
        url: e.target.result,
        file
      })
      reader.onerror = reject
      reader.readAsDataURL(file)
    } else {
      resolve({
        type: 'file',
        url: null,
        file
      })
    }
  })
}
