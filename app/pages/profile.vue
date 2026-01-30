<script setup lang="ts">

import Container from '~/components/site/Container.vue'
import AvatarName from '~/components/ui/AvatarName.vue'
import Button from '~/components/ui/button/Button.vue'

definePageMeta({
    middleware: ['auth']
})

const user = useSupabaseUser()

async function signOut() {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <Container class="mt-16 !max-w-[880px]">
        <h1 class="text-4xl font-bold">Profile</h1>
        <p>Welcome {{ user?.user_metadata?.name }}</p>
        <p>Email: {{ user?.email }}</p>
        <p>Role: {{ user?.user_metadata?.role }}</p>
        <p>Created At: {{ user?.user_metadata?.created_at }}</p>

        <Button class="mt-4" @click="signOut" class="cursor-pointer">Logout</Button>
    </Container>
</template>