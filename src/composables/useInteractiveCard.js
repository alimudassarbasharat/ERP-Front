import { computed } from 'vue'

/**
 * Composable for interactive card components
 * Provides shared behavior for hover effects, click handling, and accessibility
 * 
 * @param {Object} props - Component props
 * @param {Function} emit - Component emit function
 * @returns {Object} Card interaction utilities
 */
export function useInteractiveCard(props, emit) {
  /**
   * Computed classes for card container
   */
  const cardClasses = computed(() => {
    const base = [
      'group',
      'relative',
      'rounded-xl',
      'border',
      'transition-all',
      'duration-300',
      'cursor-pointer',
      'overflow-hidden'
    ]

    const sizeMap = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-5'
    }
    const sizeClass = sizeMap[props.size] || sizeMap.md

    const variantMap = {
      default: 'border-gray-200 hover:border-indigo-200 hover:shadow-lg',
      elevated: 'border-gray-300 hover:border-indigo-300 hover:shadow-xl',
      minimal: 'border-transparent hover:border-gray-200 hover:shadow-md'
    }
    const variantClass = variantMap[props.variant] || variantMap.default

    return [...base, sizeClass, variantClass].join(' ')
  })

  /**
   * Computed styles for background glow effect
   */
  const glowStyles = computed(() => {
    if (!props.enableGlow) return {}
    
    return {
      background: props.glowColor 
        ? `radial-gradient(circle at 0% 50%, ${props.glowColor}15 0%, transparent 70%)`
        : 'linear-gradient(to right, rgba(99, 102, 241, 0.05), rgba(147, 51, 234, 0.05))'
    }
  })

  /**
   * Handle card click with optional data
   */
  const handleClick = (event) => {
    if (props.disabled) return
    
    emit('click', {
      originalEvent: event,
      data: props.item || props.event || props.activity || props.stat
    })
  }

  /**
   * Handle keyboard interaction for accessibility
   */
  const handleKeydown = (event) => {
    if (props.disabled) return
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event)
    }
  }

  /**
   * Accessibility attributes
   */
  const accessibilityAttrs = computed(() => ({
    role: props.clickable !== false ? 'button' : undefined,
    tabindex: props.disabled ? -1 : (props.clickable !== false ? 0 : undefined),
    'aria-disabled': props.disabled || undefined,
    'aria-label': props.ariaLabel || undefined
  }))

  return {
    cardClasses,
    glowStyles,
    handleClick,
    handleKeydown,
    accessibilityAttrs
  }
}

