<script setup lang="ts">
import type { J } from 'vue-router/dist/router-CWoNjPRp.mjs';
import { toast } from 'vue-sonner'

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
        name: 'Salvatore De Falco',
        role: 'Dirigente Movimento',
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
</template>