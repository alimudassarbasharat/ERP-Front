/**
 * Common Text Size Utilities
 * Provides consistent, responsive text sizes that work perfectly on all screens
 */

export const textSizes = {
  // Headings
  h1: 'text-lg sm:text-xl font-bold',
  h2: 'text-base sm:text-lg font-semibold',
  h3: 'text-sm sm:text-base font-semibold',
  h4: 'text-xs sm:text-sm font-semibold',
  
  // Body text
  body: 'text-sm',
  bodySmall: 'text-xs sm:text-sm',
  bodyLarge: 'text-sm sm:text-base',
  
  // Labels
  label: 'text-xs font-medium',
  labelSmall: 'text-[10px] sm:text-xs font-medium',
  labelLarge: 'text-xs sm:text-sm font-medium',
  
  // Buttons
  button: 'text-xs sm:text-sm font-semibold',
  buttonSmall: 'text-xs font-medium',
  buttonLarge: 'text-sm font-semibold',
  
  // Navigation
  nav: 'text-sm font-medium',
  navActive: 'text-sm font-bold',
  
  // Calendar specific
  calendarDay: 'text-xs font-semibold',
  calendarDate: 'text-xs font-semibold',
  calendarEvent: 'text-xs font-medium',
  
  // Modal
  modalTitle: 'text-base font-semibold',
  modalLabel: 'text-xs font-semibold',
  modalContent: 'text-sm',
  
  // Cards
  cardTitle: 'text-sm font-semibold',
  cardBody: 'text-xs sm:text-sm',
  cardMeta: 'text-xs',
  
  // Badges
  badge: 'text-xs font-semibold',
  badgeSmall: 'text-[10px] font-medium',
}

/**
 * Get text size class by type
 * @param {string} type - Type of text element
 * @returns {string} Tailwind CSS classes
 */
export const getTextSize = (type) => {
  return textSizes[type] || textSizes.body
}

/**
 * Composable for text sizes in Vue components
 */
export const useTextSizes = () => {
  return {
    textSizes,
    getTextSize
  }
}

