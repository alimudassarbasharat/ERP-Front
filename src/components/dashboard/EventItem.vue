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

    <div class="flex items-start gap-2 sm:gap-3 relative z-10">
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
          :class="event.colorClass"
          :style="pulseStyles"
        />
      </div>

      <!-- Content Area -->
      <div class="flex-1 min-w-0">
        <!-- Title Slot or Default -->
        <slot name="title">
          <h4 :class="titleClasses">
            {{ event.title }}
          </h4>
        </slot>

        <!-- Date Slot or Default -->
        <slot name="date">
          <p :class="dateClasses">
            <Calendar
              :size="ICON_SIZES.xs"
              :stroke-width="ICON_STROKE_WIDTH.normal"
              class="inline flex-shrink-0"
              aria-hidden="true"
            />
            {{ formattedDate }}
          </p>
        </slot>

        <!-- Description Slot or Default -->
        <slot name="description">
          <p :class="descriptionClasses">
            {{ event.description }}
          </p>
        </slot>

        <!-- Additional Content Slot -->
        <slot name="extra" :event="event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Calendar } from 'lucide-vue-next'
import { useInteractiveCard } from '@/composables/useInteractiveCard'
import { ICON_SIZES, ICON_STROKE_WIDTH, COMPONENT_SIZES } from '@/constants/componentConstants'

/**
 * EventItem Component
 * 
 * A highly reusable, accessible, and optimized component for displaying event items
 * with customizable slots, animations, and styling options.
 * 
 * @component
 * @example
 * <EventItem
 *   :event="eventData"
 *   size="md"
 *   variant="default"
 *   :enable-glow="true"
 *   @click="handleEventClick"
 * />
 */
const props = defineProps({
  /**
   * Event data object
   * @type {Object}
   * @required
   */
  event: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'title' in value
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
   * @default 'default'
   * @values 'default', 'elevated', 'minimal'
   */
  variant: {
    type: String,
    default: 'default',
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
   * @param {Object} payload.data - Event data object
   */
  click: (payload) => payload && typeof payload === 'object'
})

// Use interactive card composable
const {
  cardClasses,
  glowStyles,
  handleClick,
  handleKeydown,
  accessibilityAttrs
} = useInteractiveCard(props, emit)

// Computed properties for performance optimization
const iconComponent = computed(() => props.event.iconComponent || null)

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
    'shadow-lg',
    'group-hover:scale-110',
    'group-hover:rotate-6',
    'transition-all',
    'duration-300',
    'flex-shrink-0'
  ]

  const sizeClass = COMPONENT_SIZES[props.size]?.iconContainer || 'w-12 h-12'
  const colorClass = props.event.colorClass || 'bg-gradient-to-br from-indigo-500 to-purple-500'

  return [...base, sizeClass, colorClass].join(' ')
})

const iconContainerStyles = computed(() => {
  if (props.event.color && !props.event.colorClass) {
    return {
      background: `linear-gradient(135deg, ${props.event.color}, ${props.event.colorDark || props.event.color})`
    }
  }
  return {}
})

const pulseStyles = computed(() => {
  if (props.event.color && !props.event.colorClass) {
    return {
      backgroundColor: props.event.color
    }
  }
  return {}
})

const titleClasses = computed(() => {
  const base = [
    'font-bold',
    'text-gray-900',
    'group-hover:text-indigo-600',
    'transition-colors'
  ]
  const sizeClass = COMPONENT_SIZES[props.size]?.textSize || 'text-sm'
  return [...base, sizeClass].join(' ')
})

const dateClasses = computed(() => {
  return [
    'text-xs',
    'text-gray-500',
    'mt-1',
    'flex',
    'items-center',
    'gap-1.5'
  ].join(' ')
})

const descriptionClasses = computed(() => {
  return [
    'text-xs',
    'text-gray-600',
    'mt-1',
    'sm:mt-1.5'
  ].join(' ')
})

const formattedDate = computed(() => {
  return props.event.date || props.event.formattedDate || 'Date not available'
})
</script>

