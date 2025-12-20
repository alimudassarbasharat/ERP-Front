<template>
  <div class="rounded-2xl bg-white/90 shadow-lg p-6">
    <slot name="search" />
    <div class="overflow-x-auto">
      <table class="min-w-full rounded-xl border-0">
        <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
          <slot name="head" />
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// No props for now
</script> 