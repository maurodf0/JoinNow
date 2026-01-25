<script setup lang="ts">
import { toast } from 'vue-sonner'
import Container from '~/components/site/Container.vue'

const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
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
    return
    toast.error(error.message)
  }

  if (!error) {
    toast.success('Controlla la tua email per il link di accesso!')
  }
}
</script>
<template>
  <Container class="mt-4">
    <div class="flex flex-col gap-4">
      <input
        v-model="email"
        type="email"
        placeholder="Inserisci la tua email"
        class="px-3 py-2 border rounded-md"
      />
      <Button @click="signInWithOtp">
        Sign In with E-Mail
      </Button>
    </div>
  </Container>
</template>
c