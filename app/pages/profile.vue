<script setup lang="ts">

import Container from '~/components/site/Container.vue'
import AvatarName from '~/components/ui/AvatarName.vue'
import Button from '~/components/ui/button/Button.vue'
import DialogButton from '~/components/site/DialogButton.vue'
import { toast } from 'vue-sonner'

definePageMeta({
    middleware: ['auth']
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

async function signOut() {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
  navigateTo('/login')
}

//Add another Admin



const loading = ref<boolean>(false)


const addAdmin = async (name: string, role: string, email: string) => {
  loading.value = true
   const {data, error} = await supabase.auth.inviteUserByEmail({
    email: email,
    options: {
      data: {
        name: name,
        role: role
      }
    }
   })
   if (error) {
    console.error('Errore durante il sign-up:', error.message)
    toast.error(error.message)
    return
   }
   if (!error) {
    toast.success('Admin aggiunto con successo!')
    loading.value = false
   }
}

</script>

<template>
  <Container class="mt-16 !max-w-[880px]">
        <h1 class="text-4xl font-bold">Profile</h1>
        <p>Welcome {{ user?.user_metadata?.name }}</p>
        <p>Email: {{ user?.email }}</p>
        <p>Role: {{ user?.user_metadata?.role }}</p>

        <div v-if="user?.user_metadata?.role === 'admin'" class="mt-4">
            <h2 class="text-2xl font-bold">Admin</h2>
            <p>Add another Admin</p>
            
        </div>

        <DialogButton 
        title="Add another Admin" 
        description="Add another Admin to the system" 
        buttonText="Add Admin" 
        confirmText="Add Admin"
        cancelText="Cancel"
        @dialogSubmit="addAdmin" />
    </Container>
</template>