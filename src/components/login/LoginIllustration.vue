<template>
  <div class="illustration-wrapper">
    <!-- Decorative Clouds -->
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    
    <!-- Main Illustration -->
    <div class="illustration-content">
      <!-- Monitor with Stand -->
      <div class="monitor-container">
        <div class="monitor-screen">
          <div class="screen-content">
            <div class="screen-header"></div>
            <div class="screen-lines">
              <div class="screen-line screen-line-1"></div>
              <div class="screen-line screen-line-2"></div>
              <div class="screen-line screen-line-3"></div>
            </div>
          </div>
        </div>
        <div class="monitor-stand"></div>
        <div class="monitor-base"></div>
      </div>
      
      <!-- Person Character -->
      <div class="person-container">
        <div class="person-body">
          <div class="person-head"></div>
          <div class="person-arm"></div>
          <div class="person-legs">
            <div class="leg leg-left"></div>
            <div class="leg leg-right"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Abstract Shapes -->
    <div class="abstract-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>
  </div>
</template>

<script setup>
// No props needed - pure presentational component
</script>

<style scoped>
.illustration-wrapper {
  @apply relative w-full h-full max-w-[500px] max-h-[400px] flex items-center justify-center;
}

/* Clouds */
.cloud {
  @apply absolute bg-gradient-to-br from-slate-200 to-slate-300 rounded-[50px] opacity-40 hidden lg:block;
}

.cloud-1 {
  @apply w-20 h-9 top-[15%] right-[25%];
}

.cloud-2 {
  @apply w-[60px] h-6 top-[25%] right-[15%];
}

.cloud-3 {
  @apply w-[45px] h-5 top-[35%] right-[35%];
}

.illustration-content {
  @apply relative w-full h-full flex items-center justify-center;
}

/* Monitor */
.monitor-container {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2];
}

.monitor-screen {
  @apply w-80 h-[200px] bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl relative shadow-[0_15px_30px_rgba(0,0,0,0.2)] border-8 border-slate-200;
  @apply lg:w-60 lg:h-[150px] md:w-[180px] md:h-[110px];
}

.screen-content {
  @apply p-5 h-full;
}

.screen-header {
  @apply w-full h-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded mb-[15px];
}

.screen-lines {
  @apply flex flex-col gap-2;
}

.screen-line {
  @apply h-2 bg-slate-400/30 rounded;
}

.screen-line-1 {
  @apply w-4/5;
}

.screen-line-2 {
  @apply w-[95%];
}

.screen-line-3 {
  @apply w-3/5;
}

.monitor-stand {
  @apply absolute w-2 h-[60px] bg-gradient-to-br from-slate-400 to-slate-500 bottom-[-60px] left-1/2 -translate-x-1/2 rounded;
  @apply md:h-10 md:bottom-[-40px];
}

.monitor-base {
  @apply absolute w-20 h-5 bg-gradient-to-br from-slate-400 to-slate-500 bottom-[-80px] left-1/2 -translate-x-1/2 rounded-[10px];
  @apply md:w-[60px] md:h-[15px] md:bottom-[-55px];
}

/* Person */
.person-container {
  @apply absolute bottom-[20%] left-[20%] z-[3] md:bottom-[15%] md:left-[15%];
}

.person-body {
  @apply w-[50px] h-[70px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-[25px_25px_8px_8px] relative;
  @apply md:w-10 md:h-[55px];
}

.person-head {
  @apply w-[35px] h-10 bg-gradient-to-br from-orange-200 to-orange-300 rounded-[50%_50%_40%_40%] absolute -top-[30px] left-1/2 -translate-x-1/2;
  @apply md:w-7 md:h-8 md:-top-6;
}

.person-arm {
  @apply w-[35px] h-3 bg-gradient-to-br from-orange-200 to-orange-300 rounded-md absolute top-[15px] -right-[25px] rotate-[-25deg] origin-left;
  @apply md:hidden;
}

.person-legs {
  @apply absolute -bottom-[35px] left-1/2 -translate-x-1/2 flex gap-2;
}

.leg {
  @apply w-4 h-[35px] bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg;
}

/* Abstract Shapes */
.abstract-shapes {
  @apply absolute inset-0 pointer-events-none;
}

.shape {
  @apply absolute;
}

.shape-1 {
  @apply w-[120px] h-20 bg-gradient-to-br from-pink-500 to-pink-700 rounded-[40px] bottom-[10%] right-[10%] opacity-80 rotate-[-15deg];
  @apply lg:hidden;
}

.shape-2 {
  @apply w-[60px] h-[60px] bg-gradient-to-br from-amber-500 to-amber-600 rounded-full top-[20%] left-[15%] opacity-60;
  @apply lg:hidden;
}
</style>

