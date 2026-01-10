<template>
  <div class="illustration-wrapper">
    <img 
      src="@/assets/login-image.png" 
      alt="Login Illustration" 
      class="login-image"
    />
  </div>
</template>

<script setup>
// No props needed - pure presentational component
</script>

<style scoped>
.illustration-wrapper {
  @apply relative w-full h-full flex items-center justify-center;
}

.login-image {
  @apply w-full h-full object-contain max-w-full max-h-full;
  @apply lg:max-w-[500px] lg:max-h-[400px];
  @apply md:max-w-[400px] md:max-h-[300px];
  @apply sm:max-w-[300px] sm:max-h-[250px];
}
</style>

