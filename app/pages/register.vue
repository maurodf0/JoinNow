<script setup lang="ts">
import { toast } from 'vue-sonner';
import Container from '~/components/site/Container.vue';
import Input from '~/components/ui/input/Input.vue';


const state = reactive<{
  email: string,
  password: string
}>({
  email: '',
  password: ''  
})

const registerUser = async () => {
  try {
      const supabase = useSupabaseClient()

const { data, error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
})
if (error) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.success('Registration successful! Please check your email to confirm your account.');
      }
  } catch (err) {
      toast.error('An unexpected error occurred. Please try again later.');
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
        <label for="email">Email:</label>
        <Input type="email" placeholder="Email" id="email" v-model="state.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <Input type="password" id="password" v-model="state.password" required />
      </div>
      <Button class="mt-4" type="submit">Register</Button>
    </form>
  </div>
  </Container>  
</template>