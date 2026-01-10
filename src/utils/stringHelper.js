/**
 * String Helper
 * 
 * Reusable string manipulation and formatting functions
 * Can be used across multiple projects
 */

/**
 * Convert snake_case to Title Case
 * 
 * @param {string} value
 * @returns {string}
 */
export function snakeToTitle(value) {
  if (!value) return ''
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Convert camelCase to Title Case
 * 
 * @param {string} value
 * @returns {string}
 */
export function camelToTitle(value) {
  if (!value) return ''
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Capitalize all words
 * 
 * @param {...string} words
 * @returns {string}
 */
export function capitalizeWords(...words) {
  const result = words
    .filter(word => word)
    .map(word => word.trim().toUpperCase())
  
  return result.length === 1 ? result[0] : result.join(' ')
}

/**
 * Generate initials from full name
 * 
 * @param {string} name
 * @param {number} maxLength
 * @returns {string}
 */
export function getInitials(name, maxLength = 2) {
  if (!name) return ''
  
  const words = name.trim().split(' ')
  let initials = ''
  
  for (const word of words) {
    if (word && initials.length < maxLength) {
      initials += word.charAt(0).toUpperCase()
    }
  }
  
  return initials || name.substring(0, maxLength).toUpperCase()
}

/**
 * Truncate string with ellipsis
 * 
 * @param {string} str
 * @param {number} length
 * @param {string} suffix
 * @returns {string}
 */
export function truncate(str, length = 100, suffix = '...') {
  if (!str) return ''
  if (str.length <= length) return str
  return str.substring(0, length) + suffix
}

/**
 * Sanitize string (remove HTML, trim, etc.)
 * 
 * @param {string} str
 * @param {boolean} stripHtml
 * @returns {string}
 */
export function sanitize(str, stripHtml = true) {
  if (!str) return ''
  
  let result = str.trim()
  
  if (stripHtml) {
    const div = document.createElement('div')
    div.textContent = result
    result = div.textContent || div.innerText || ''
  }
  
  return result
}

/**
 * Extract mentions from text (@username or @"Full Name")
 * 
 * @param {string} text
 * @returns {string[]}
 */
export function extractMentions(text) {
  if (!text) return []
  
  const mentions = []
  const regex = /@(\w+|"[^"]+")/g
  let match
  
  while ((match = regex.exec(text)) !== null) {
    mentions.push(match[1].replace(/"/g, ''))
  }
  
  return [...new Set(mentions)]
}

/**
 * Generate slug from string
 * 
 * @param {string} str
 * @param {string} separator
 * @returns {string}
 */
export function slugify(str, separator = '-') {
  if (!str) return ''
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, separator)
    .replace(/^-+|-+$/g, '')
}

/**
 * Format file size
 * 
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
