<script setup lang="ts">
import { toast } from 'vue-sonner'
import Container from '~/components/site/Container.vue'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'

const supabase = useSupabaseClient()
const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const showMagicLink = ref<boolean>(false)

const signInWithPassword = async () => {
  loading.value = true
  if (!email.value || !password.value) {
    toast.error('Email e password sono richieste')
    console.error('Email e password sono richieste')
    return
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.error('Errore durante il sign-in:', error.message)
    toast.error(error.message)
    return
  }

  if (!error) {
    toast.success('Login effettuato con successo!')
    navigateTo('/confirm')
  }
  loading.value = false
}


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
    navigateTo('/confirm')
  }
  loading.value = false
}
</script>

<template>

  <Container class="mt-16 !max-w-[880px]">
    <ButtonGroup>
    <Button @click="showMagicLink = true">Magic Link</Button>
    <Button @click="showMagicLink = false">Login with Password</Button>
  </ButtonGroup>

  <template v-if="showMagicLink">
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
  </template>
  <template v-else>
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
      <input
        v-model="password"
        type="password"
        placeholder="Inserisci la tua password"
        class="px-3 py-2 border rounded-md"
      />
      <Button @click="signInWithPassword">
        Sign In 
        <Spinner v-if="loading" />
      </Button>
    </div>
  </template>
  </Container>
</template>
