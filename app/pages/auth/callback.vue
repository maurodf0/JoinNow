<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()


onMounted(async () => {
  const { error } = await supabase.auth.exchangeCodeForSession(
    window.location.href
  )

  if (error) {
    console.error('Auth error:', error)
    await router.replace('/login')
  } else {
    await router.replace('/dashboard')
  }
})
</script>

<template>
  <div class="p-8">
    <p>Completamento accesso…</p>
  </div>
</template>
