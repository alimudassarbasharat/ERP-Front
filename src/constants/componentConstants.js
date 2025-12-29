/**
 * Shared constants for dashboard components
 * Centralized configuration for consistency and maintainability
 */

export const ICON_SIZES = {
  xs: 10,
  sm: 14,
  md: 18,
  lg: 24,
  xl: 32
}

export const ICON_STROKE_WIDTH = {
  thin: 1.5,
  normal: 2,
  bold: 2.5,
  heavy: 3
}

export const COMPONENT_SIZES = {
  sm: {
    padding: 'p-3',
    iconSize: ICON_SIZES.sm,
    iconContainer: 'w-10 h-10',
    textSize: 'text-xs'
  },
  md: {
    padding: 'p-4',
    iconSize: ICON_SIZES.md,
    iconContainer: 'w-12 h-12',
    textSize: 'text-sm'
  },
  lg: {
    padding: 'p-5',
    iconSize: ICON_SIZES.lg,
    iconContainer: 'w-14 h-14',
    textSize: 'text-base'
  }
}

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
}

export const TRANSITION_CLASSES = {
  default: 'transition-all duration-300',
  fast: 'transition-all duration-150',
  slow: 'transition-all duration-500'
}

export const COLOR_GRADIENTS = {
  yellow: 'bg-gradient-to-br from-yellow-500 to-orange-500',
  blue: 'bg-gradient-to-br from-blue-500 to-indigo-500',
  purple: 'bg-gradient-to-br from-purple-500 to-pink-500',
  green: 'bg-gradient-to-br from-green-500 to-emerald-500',
  red: 'bg-gradient-to-br from-red-500 to-rose-500',
  indigo: 'bg-gradient-to-br from-indigo-500 to-purple-500'
}

