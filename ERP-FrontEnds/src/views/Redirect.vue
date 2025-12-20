<template>
  <div></div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

onMounted(() => {
  // Get the redirect path from the query parameter
  const redirectPath = router.currentRoute.value.query.redirect || '/'
  router.replace(redirectPath)
})
</script> 