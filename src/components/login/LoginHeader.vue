<template>
  <div class="header-container">
    <h1 class="brand-title">Teachify</h1>
    <p class="brand-subtitle">Login your account</p>
  </div>
</template>

<script setup>
// Pure presentational component
</script>

<style scoped>
.header-container {
  @apply text-center mb-10 lg:mb-8 md:mb-[30px];
}

.brand-title {
  @apply text-[32px] font-bold text-white m-0 mb-2 tracking-[-0.5px];
  @apply lg:text-[28px] md:text-2xl md:mb-1.5 md:text-[22px];
}

.brand-subtitle {
  @apply text-base font-normal text-white m-0;
  @apply lg:text-sm md:text-[13px];
}
</style>

