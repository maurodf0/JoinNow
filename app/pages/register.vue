<script setup lang="ts">
import { toast } from 'vue-sonner'
import Container from '~/components/site/Container.vue'
import Input from '~/components/ui/input/Input.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'


type Role = 'admin' | 'user' | 'developer' | 'worker' | 'other';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'developer', label: 'Developer' },
  { value: 'worker', label: 'Worker' },
  { value: 'other', label: 'Other' }
]
const loading = ref<boolean>(false)
const state = reactive<{
  email: string,
  password: string,
  name: string,
  role: Role
}>({
  email: '',
  password: '' ,
  name: '',
  role: 'user' as Role
})


const registerUser = async () => {
  loading.value = true
  try {
      const supabase = useSupabaseClient()

const isValidRole = (r: string): r is Role =>
  ['admin', 'user', 'developer', 'worker', 'other'].includes(r)

if (!isValidRole(state.role)) {
  toast.error('Ruolo non valido')
  return
}

const { data, error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          data: {
            name: state.name,
            role: state.role
          }
        }
})
if (error) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.success('Registration successful! Please check your email to confirm your account.');
        loading.value = false
      }
  } catch (err) {
      toast.error('An unexpected error occurred. Please try again later.');
      loading.value = false
   }

}

</script>
<template>
  <Container class="mt-16 !max-w-[880px]">
  <div class="registration-form">
      <h1 class="text-4xl font-bold">Register to JoinNow</h1>
      <p>Registrati con la tua email per continuare</p>
    <form class="mt-4 flex flex-col gap-2" @submit.prevent="registerUser">
       <div class="form-group">
        <label for="name">Name:</label>
        <Input type="text" placeholder="Name" id="name" v-model="state.name" required />
      </div>
         <div class="form-group">
        <label for="Role">Role:</label>
        <Select v-model="state.role">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="r in roles"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <Input type="email" placeholder="Email" id="email" v-model="state.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <Input type="password" id="password" v-model="state.password" required />
      </div>
      <Button class="mt-4" type="submit">Register <Spinner v-if="loading" /></Button>
    </form>
  </div>
  </Container>  
</template>