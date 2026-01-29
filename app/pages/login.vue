<script setup lang="ts">
import { toast } from 'vue-sonner'
import Container from '~/components/site/Container.vue'

const supabase = useSupabaseClient()
const email = ref<string>('')
const loading = ref<boolean>(false)
const signInWithOtp = async () => {
  loading.value = true
  if (!email.value) {
    toast.error('Email è richiesta')
    console.error('Email è richiesta')
    return
  }
  
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/',
    }
  })
  if (error) {
    console.error('Errore durante il sign-in:', error.message)
    toast.error(error.message)
    return
  }

  if (!error) {
    toast.success('Controlla la tua email per il link di accesso!')
  }
  loading.value = false
}
</script>
<template>
  <Container class="mt-16 !max-w-[880px]">
    <div class="flex flex-col mb-4">
      <h1 class="text-4xl font-bold">Login to JoinNow</h1>
      <p>Accedi con la tua email per continuare</p>
    </div>
    <div class="flex flex-col gap-4">
      <input
        v-model="email"
        type="email"
        placeholder="Inserisci la tua email"
        class="px-3 py-2 border rounded-md"
      />
      <Button @click="signInWithOtp">
        Sign In with E-Mail
        <Spinner v-if="loading" />
      </Button>
    </div>
  </Container>
</template>
