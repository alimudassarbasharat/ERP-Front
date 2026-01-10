export const parseMentions = (text) => {
  const mentionRegex = /@(\w+)/g
  const mentions = []
  let match

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push({
      username: match[1],
      index: match.index,
      length: match[0].length
    })
  }

  return mentions
}

export const highlightMentions = (text, currentUserId, users = []) => {
  const mentionRegex = /@(\w+)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = mentionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      })
    }

    const username = match[1]
    const user = users.find(u => u.name?.toLowerCase() === username.toLowerCase() || u.username?.toLowerCase() === username.toLowerCase())
    const isCurrentUser = user?.id === currentUserId

    parts.push({
      type: 'mention',
      content: match[0],
      username,
      userId: user?.id,
      isCurrentUser
    })

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex)
    })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

export const extractMentionedUserIds = (text, users = []) => {
  const mentions = parseMentions(text)
  const userIds = []

  mentions.forEach(mention => {
    const user = users.find(u => 
      u.name?.toLowerCase() === mention.username.toLowerCase() || 
      u.username?.toLowerCase() === mention.username.toLowerCase()
    )
    if (user && !userIds.includes(user.id)) {
      userIds.push(user.id)
    }
  })

  return userIds
}

export const formatMentionText = (text, users = []) => {
  const parts = highlightMentions(text, null, users)
  return parts.map(part => {
    if (part.type === 'mention') {
      return `<span class="mention ${part.isCurrentUser ? 'mention-current' : ''}" data-user-id="${part.userId || ''}">${part.content}</span>`
    }
    return part.content
  }).join('')
}
