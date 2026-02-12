<script setup lang="ts">
import Container from '~/components/site/Container.vue'
import AvatarName from '~/components/ui/AvatarName.vue'
import Button from '~/components/ui/button/Button.vue'
import DialogButton from '~/components/site/DialogButton.vue'
import { Input } from '~/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '~/components/ui/card'
import { toast } from 'vue-sonner'

definePageMeta({
    middleware: ['auth']
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const loading = ref<boolean>(false)
const updatingEmail = ref(false)
const updatingPassword = ref(false)
const uploadingAvatar = ref(false)

const newEmail = ref('')
const newPassword = ref('')
const avatarFile = ref<File | null>(null)

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) toast.error(error.message)
  else navigateTo('/login')
}

const updateEmail = async () => {
  if (!newEmail.value) return
  updatingEmail.value = true
  try {
    const { error } = await supabase.auth.updateUser({ email: newEmail.value })
    if (error) throw error
    toast.success('Controlla la tua email per confermare il cambio indirizzo')
    newEmail.value = ''
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    updatingEmail.value = false
  }
}

const updatePassword = async () => {
  if (!newPassword.value) return
  updatingPassword.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword.value })
    if (error) throw error
    toast.success('Password aggiornata con successo!')
    newPassword.value = ''
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    updatingPassword.value = false
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    avatarFile.value = target.files[0]
  }
}

const uploadAvatar = async () => {
  if (!avatarFile.value) return
  uploadingAvatar.value = true
  try {
    const file = avatarFile.value
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.value?.id}-${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    // 3. Update User Metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    })

    if (updateError) throw updateError

    toast.success('Avatar aggiornato con successo!')
    avatarFile.value = null
  } catch (error: any) {
    console.error('Error uploading avatar:', error)
    toast.error(error.message || 'Errore durante il caricamento dell\'avatar')
  } finally {
    uploadingAvatar.value = false
  }
}

const addAdmin = async (name: string, role: string, email: string) => {
  loading.value = true
  try {
    const result = await $fetch<{ success: boolean }>('/api/add-admin', {
      method: 'POST',
      body: { email, name, role }
    })
    
    if (result.success) {
      toast.success('Admin aggiunto con successo!')
    }
  } catch (error: any) {
    toast.error(error.statusMessage || 'Errore durante l\'aggiunta dell\'admin')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Container class="mt-16 !max-w-[880px] pb-24">
    <div class="flex flex-col gap-8">
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold">Profile</h1>
          <p class="text-muted-foreground transition-all">Gestisci il tuo account e le tue preferenze</p>
        </div>
        <Button variant="destructive" @click="signOut">Log Out</Button>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sidebar Info -->
        <Card class="md:col-span-1">
          <CardHeader>
            <CardTitle>Dati Profilo</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col items-center gap-4">
            <ClientOnly>
               <AvatarName 
                class="scale-150 mb-4"
                :name="user?.user_metadata?.name || 'User'" 
                :url="user?.user_metadata?.avatar_url" 
              />
            </ClientOnly>
            <div class="text-center">
              <p class="font-bold text-lg">{{ user?.user_metadata?.name }}</p>
              <p class="text-sm text-muted-foreground">{{ user?.email }}</p>
              <div class="mt-2 text-xs uppercase bg-slate-800 px-2 py-1 rounded inline-block">
                {{ user?.user_metadata?.role }}
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Main Settings -->
        <div class="md:col-span-2 flex flex-col gap-6">
          <!-- Avatar Upload -->
          <Card>
            <CardHeader>
              <CardTitle>Cambia Avatar</CardTitle>
              <CardDescription>Carica una nuova immagine per il tuo profilo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-col gap-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  class="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
                  @change="handleFileChange"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button :disabled="!avatarFile || uploadingAvatar" @click="uploadAvatar">
                {{ uploadingAvatar ? 'Caricamento...' : 'Salva Avatar' }}
                <Spinner v-if="uploadingAvatar" class="ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <!-- Email & Password -->
          <Card>
            <CardHeader>
              <CardTitle>Sicurezza e Accesso</CardTitle>
              <CardDescription>Aggiorna le tue credenziali di accesso.</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Nuova Email</label>
                <div class="flex gap-2">
                  <Input v-model="newEmail" type="email" placeholder="nuova@email.com" />
                  <Button variant="secondary" :disabled="!newEmail || updatingEmail" @click="updateEmail">
                    {{ updatingEmail ? 'Inviando...' : 'Aggiorna Email' }}
                  </Button>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">Nuova Password</label>
                <div class="flex gap-2">
                  <Input v-model="newPassword" type="password" placeholder="********" />
                  <Button variant="secondary" :disabled="!newPassword || updatingPassword" @click="updatePassword">
                    {{ updatingPassword ? 'Salvataggio...' : 'Cambia Password' }}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Admin Section -->
          <Card v-if="user?.user_metadata?.role === 'admin'" class="border-orange-950/50">
            <CardHeader>
              <CardTitle class="text-orange-500">Amministrazione</CardTitle>
              <CardDescription>Funzioni riservate agli amministratori.</CardDescription>
            </CardHeader>
            <CardContent>
              <DialogButton 
                title="Add another Admin" 
                description="Add another Admin to the system" 
                buttonText="Add Admin" 
                confirmText="Add Admin"
                cancelText="Cancel"
                @dialogSubmit="addAdmin" 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </Container>
</template>