<script setup lang="ts">

import { toast } from 'vue-sonner'
const user = useSupabaseUser();
console.log(user.value);
interface JoinPerson {
  name: string;
  role: string;
}

interface JoinResponse {
  statusCode: number;
  message: string;
}

const loading = ref<boolean>(false);

const joinPerson = async () => {
  try {
    loading.value = true;
    const data = await $fetch<JoinResponse>('/api/join', {
      method: 'POST',
      body: {
        name: user.value?.user_metadata?.name || '',
        role: user.value?.user_metadata?.role || '',
        email: user.value?.email || '',
      } as JoinPerson,
    });

    toast.success(data.message);
    loading.value = false;
  } catch (error) {
    console.error("Error joining person:", error);
    toast.error((error as any).message || 'Errore durante il join');
    loading.value = false;
  }
}
</script>

<template>
  <Container v-if="user" class="mt-16 !max-w-[880px]">
  <div class="grid place-items-center justify-center min-h-screen">
    <div class="container">
      <Button 
      @click="joinPerson">
        Click me
        <template v-if="loading">
           <Spinner class="size-3" />
        </template>
      </Button>
    </div>

  </div>
</Container>

<Container v-else>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold">Login to JoinNow</h1>
    <p>Accedi con la tua email per continuare</p>
    <Button @click="navigateTo('/login')" class="cursor-pointer mt-4">Login</Button>
  </div>
</Container>
</template>