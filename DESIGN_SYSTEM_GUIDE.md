# Design System Guide - Fee Analytics as Gold Standard

## Overview
This document defines the design system extracted from Fee Analytics. All Fee Management and Exam Management pages MUST follow these patterns exactly.

## Design Tokens

### Colors
- **Background**: `bg-gradient-to-br from-pink-50 via-white to-rose-50` (light) / `dark:from-gray-900 dark:via-gray-800 dark:to-gray-900` (dark)
- **Primary Gradient**: `from-purple-500 to-pink-500` with hover `from-purple-600 to-pink-600`
- **Card Background**: `bg-white/90` or `bg-white` with `dark:bg-gray-800`
- **Borders**: `border-gray-200` (light) / `dark:border-gray-700` (dark)

### Typography
- **Page Title**: `text-base font-medium text-gray-600 tracking-tight`
- **Section Headers**: `text-xl font-bold text-gray-900` with icon circle `w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500`
- **Card Titles**: `text-lg font-bold text-gray-900`
- **KPI Labels**: `text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide uppercase`
- **KPI Values**: `text-base sm:text-lg font-black text-gray-900 tracking-tight`

### Spacing
- **Page Padding**: `p-4 sm:p-6 lg:p-8`
- **Card Padding**: `p-4 sm:p-5` (KPI cards) / `p-6` (section cards)
- **Gap Between Cards**: `gap-3 sm:gap-4` (KPI grid) / `gap-6` (section grid)
- **Section Margin**: `mb-4` (between sections)

### Shadows & Borders
- **KPI Cards**: `shadow-sm hover:shadow-md` with `border border-gray-200/80`
- **Section Cards**: `shadow-lg hover:shadow-xl` with `border border-gray-200`
- **Header**: `shadow-lg` with `border border-gray-200`

## Component Library

### PageShell
**Usage**: Wrap entire page content
```vue
<PageShell 
  title="Page Title"
  :breadcrumbs="[{ label: 'Parent', route: '/parent' }, { label: 'Current' }]"
>
  <!-- Page content -->
</PageShell>
```

### KPICard
**Usage**: Dashboard statistics
```vue
<KPICard
  label="Label"
  :value="value"
  :icon="IconComponent"
  icon-bg-class="bg-gradient-to-br from-color-100 to-color-200"
  icon-class="text-color-600"
  :trend="{ type: 'positive', value: '+12.5%' }"
  :badge="'Badge text'"
/>
```

### ActionBar
**Usage**: Primary action buttons
```vue
<ActionBar>
  <ActionButton label="Action" :icon="Icon" variant="primary" @click="handler" />
</ActionBar>
```

### ActionButton
**Variants**: `primary`, `success`, `info`, `warning`, `secondary`
- Primary: Purple-pink gradient
- Success: Green-emerald gradient
- Info: Blue-indigo gradient
- Warning: Orange-red gradient
- Secondary: White with border

### SectionCard
**Usage**: Navigation cards (like Analytics Categories)
```vue
<SectionCard
  title="Title"
  description="Description"
  :icon="Icon"
  icon-bg-class="bg-gradient-to-r from-color-100 to-color-200"
  :tags="[{ label: 'Tag', class: 'bg-color-100 text-color-700' }]"
  @click="navigate"
/>
```

### InsightCard
**Usage**: Insights section
```vue
<InsightCard
  label="Label"
  value="Value"
  description="Description"
  color="orange" // orange, blue, green, purple, red
/>
```

### ActivityItem
**Usage**: Recent activity lists
```vue
<ActivityItem
  title="Title"
  description="Description"
  time="2 hours ago"
  :amount="5000"
  type="payment" // payment, due, notification
  :icon="Icon"
  :format-currency="formatCurrency"
/>
```

### EmptyState
**Usage**: Empty lists
```vue
<EmptyState
  title="No items"
  description="Description"
  :icon="Icon"
  icon-color="gray"
  action-label="Create First"
  @action="handler"
/>
```

### SectionHeader
**Usage**: Section titles with icon
```vue
<SectionHeader title="Section Title" :icon="Icon" />
```

### StatusChip
**Usage**: Status badges
```vue
<StatusChip label="Status" status="success" />
```

## Layout Patterns

### Standard Page Structure
```vue
<PageShell title="..." :breadcrumbs="...">
  <!-- KPI Cards (if dashboard) -->
  <div class="w-full mb-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      <KPICard ... />
    </div>
  </div>

  <!-- Action Bar -->
  <ActionBar>
    <ActionButton ... />
  </ActionBar>

  <!-- Content Sections -->
  <div class="w-full mb-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <SectionHeader title="..." />
      <!-- Content -->
    </div>
  </div>
</PageShell>
```

### List Pattern (Matching Recent Activity)
```vue
<div class="space-y-4">
  <ActivityItem v-for="item in items" :key="item.id" ... />
  <EmptyState v-if="items.length === 0" ... />
</div>
```

### Card Grid Pattern (Matching Analytics Categories)
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <SectionCard v-for="item in items" :key="item.id" ... />
</div>
```

## Rules

1. **Always use PageShell** for consistent header and layout
2. **Always use ActionBar** for primary actions
3. **Always use KPICard** for statistics (never custom cards)
4. **Always use ActivityItem** for lists (never custom list items)
5. **Always use EmptyState** when lists are empty
6. **Never use tabs** - use cards or sections instead
7. **Never show 10+ buttons** - group in ActionBar or cards
8. **Always match spacing** - use exact classes from Fee Analytics
9. **Always match colors** - use exact gradient classes
10. **Always match typography** - use exact font classes

## Quick Reference

- **Background**: `from-pink-50 via-white to-rose-50`
- **Header**: `bg-white/90 rounded-lg shadow-lg py-2 px-5`
- **KPI Card**: `rounded-xl border border-gray-200/80 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm`
- **Section Card**: `bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105`
- **Button**: `px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full`
