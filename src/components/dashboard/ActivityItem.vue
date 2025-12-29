<template>
  <div 
    :class="cardClasses"
    v-bind="accessibilityAttrs"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Animated Background Glow -->
    <div
      v-if="enableGlow"
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :style="glowStyles"
    />

    <div class="flex items-start gap-3 sm:gap-4 relative z-10">
      <!-- Icon Container -->
      <div
        v-if="showIcon"
        :class="iconContainerClasses"
        :style="iconContainerStyles"
      >
        <component
          :is="iconComponent"
          :size="iconSize"
          :stroke-width="iconStrokeWidth"
          class="sm:w-5 sm:h-5 animate-icon-bounce"
          aria-hidden="true"
        />
        <!-- Pulse Ring Animation -->
        <div
          v-if="enablePulse"
          class="absolute inset-0 rounded-xl animate-ping opacity-20"
          :style="pulseStyles"
        />
    </div>
    
      <!-- Content Area -->
    <div class="flex-1 min-w-0 relative z-10">
        <!-- Content Slot or Default -->
        <slot name="content">
          <p :class="contentClasses">
            {{ activity.content }}
          </p>
        </slot>

        <!-- Time Slot or Default -->
        <slot name="time">
          <p :class="timeClasses">
            <Clock
              :size="ICON_SIZES.xs"
              :stroke-width="ICON_STROKE_WIDTH.normal"
              class="inline flex-shrink-0"
              aria-hidden="true"
            />
        {{ activity.time }}
      </p>
        </slot>

        <!-- Status Badge Slot or Default -->
        <slot name="status" :activity="activity" :statusClass="statusClass">
          <div v-if="showStatus" class="flex items-center gap-2 mt-2">
            <span :class="statusBadgeClasses">
          {{ activity.type }}
        </span>
          </div>
        </slot>

        <!-- Additional Content Slot -->
        <slot name="extra" :activity="activity" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Clock } from 'lucide-vue-next'
import { useInteractiveCard } from '@/composables/useInteractiveCard'
import { ICON_SIZES, ICON_STROKE_WIDTH, COMPONENT_SIZES } from '@/constants/componentConstants'

/**
 * ActivityItem Component
 * 
 * A highly reusable, accessible, and optimized component for displaying activity items
 * with customizable slots, animations, and styling options.
 * 
 * @component
 * @example
 * <ActivityItem
 *   :activity="activityData"
 *   size="md"
 *   :enable-glow="true"
 *   @click="handleActivityClick"
 * />
 */
const props = defineProps({
  /**
   * Activity data object
   * @type {Object}
   * @required
   */
  activity: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'content' in value
    }
  },

  /**
   * Component size variant
   * @type {String}
   * @default 'md'
   * @values 'sm', 'md', 'lg'
   */
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },

  /**
   * Visual variant style
   * @type {String}
   * @default 'minimal'
   * @values 'default', 'elevated', 'minimal'
   */
  variant: {
    type: String,
    default: 'minimal',
    validator: (value) => ['default', 'elevated', 'minimal'].includes(value)
  },

  /**
   * Enable background glow effect on hover
   * @type {Boolean}
   * @default true
   */
  enableGlow: {
    type: Boolean,
    default: true
  },

  /**
   * Enable pulse animation on icon
   * @type {Boolean}
   * @default true
   */
  enablePulse: {
    type: Boolean,
    default: true
  },

  /**
   * Show icon container
   * @type {Boolean}
   * @default true
   */
  showIcon: {
    type: Boolean,
    default: true
  },

  /**
   * Show status badge
   * @type {Boolean}
   * @default true
   */
  showStatus: {
    type: Boolean,
    default: true
  },

  /**
   * Custom glow color (hex format)
   * @type {String}
   */
  glowColor: {
    type: String,
    default: null
  },

  /**
   * Disable click interaction
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * Accessibility label
   * @type {String}
   */
  ariaLabel: {
    type: String,
    default: null
  },

  /**
   * Whether component is clickable
   * @type {Boolean}
   * @default true
   */
  clickable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits({
  /**
   * Emitted when card is clicked
   * @param {Object} payload - Click event data
   * @param {Event} payload.originalEvent - Original DOM event
   * @param {Object} payload.data - Activity data object
   */
  click: (payload) => payload && typeof payload === 'object'
})

// Use interactive card composable
const {
  cardClasses: baseCardClasses,
  glowStyles: baseGlowStyles,
  handleClick,
  handleKeydown,
  accessibilityAttrs
} = useInteractiveCard(props, emit)

// Override card classes for activity-specific styling
const cardClasses = computed(() => {
  const base = baseCardClasses.value.split(' ')
  // Remove default border classes and add activity-specific
  const filtered = base.filter(cls => !cls.includes('border-') && !cls.includes('hover:border-'))
  return [
    ...filtered,
    'hover:bg-white/60'
  ].join(' ')
})

// Override glow styles to use activity color
const glowStyles = computed(() => {
  if (!props.enableGlow) return {}
  
  const color = props.glowColor || props.activity.color
  if (color) {
    return {
      background: `radial-gradient(circle at 0% 50%, ${color}15 0%, transparent 70%)`
    }
  }
  
  return baseGlowStyles.value
})

// Computed properties for performance optimization
const iconComponent = computed(() => props.activity.iconComponent || null)

const iconSize = computed(() => {
  return COMPONENT_SIZES[props.size]?.iconSize || ICON_SIZES.md
})

const iconStrokeWidth = computed(() => ICON_STROKE_WIDTH.bold)

const iconContainerClasses = computed(() => {
  const base = [
    'relative',
    'rounded-xl',
    'flex',
    'items-center',
    'justify-center',
    'text-white',
    'flex-shrink-0',
    'shadow-lg',
    'group-hover:scale-110',
    'group-hover:rotate-6',
    'transition-all',
    'duration-300'
  ]

  const sizeClass = COMPONENT_SIZES[props.size]?.iconContainer || 'w-12 h-12'
  return [...base, sizeClass].join(' ')
})

const iconContainerStyles = computed(() => {
  const color = props.activity.color
  const colorDark = props.activity.colorDark || color
  
  if (color) {
    return {
      background: `linear-gradient(135deg, ${color}, ${colorDark})`
    }
  }
  
  return {
    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
  }
})

const pulseStyles = computed(() => {
  const color = props.activity.color
  if (color) {
    return {
      backgroundColor: color
    }
  }
  return {}
})

const contentClasses = computed(() => {
  const base = [
    'text-gray-900',
    'font-semibold',
    'leading-relaxed'
  ]
  const sizeClass = COMPONENT_SIZES[props.size]?.textSize || 'text-sm'
  return [...base, sizeClass].join(' ')
})

const timeClasses = computed(() => {
  return [
    'text-xs',
    'text-gray-500',
    'mt-1',
    'sm:mt-1.5',
    'font-medium',
    'flex',
    'items-center',
    'gap-1.5'
  ].join(' ')
})

const statusClass = computed(() => {
  const statusMap = {
    success: 'bg-green-100 text-green-800',
    primary: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-indigo-100 text-indigo-800',
    error: 'bg-red-100 text-red-800',
    danger: 'bg-red-100 text-red-800'
  }
  
  return statusMap[props.activity.type] || statusMap.info
})

const statusBadgeClasses = computed(() => {
  return [
    statusClass.value,
    'px-2',
    'sm:px-2.5',
    'py-0.5',
    'sm:py-1',
    'rounded-full',
    'text-xs',
    'font-semibold',
    'shadow-sm'
  ].join(' ')
})
</script>

