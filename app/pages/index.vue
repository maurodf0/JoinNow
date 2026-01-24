<script setup lang="ts">
import { toast } from 'vue-sonner'

const loading = ref<boolean>(false);

const joinPerson = async () => {
  try {
  loading.value = true;
  const response  = $fetch('/api/join', {
    method: 'POST',
    body: {
      id: 10,
      name: 'Salvatore De Falco',
      time: new Date().toISOString()
    }
  })

  const data = await response;
  toast.success(data.message);
  loading.value = false;
} catch (error) {
  console.error("Error joining person:", error);
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