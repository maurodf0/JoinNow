<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue"

const responseMeggage = ref<string>("");
const loading = ref<boolean>(false);

const joinPerson = async () => {
  try {
  loading.value = true;
  const response  = $fetch('/api/join', {
    method: 'POST',
    body: {
      id: 1,
      name: 'Myself',
      time: new Date().toISOString()
    }
  })

  const data = await response;
  console.log(data);
  responseMeggage.value = data.message;
} catch (error) {
  console.error("Error joining person:", error);
}
}
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div class="container">
      <Button @click="joinPerson">Click me</Button>
      <p v-if="loading" class="mt-4 text-green-600">Loading...</p>
      <p v-if="responseMeggage" class="mt-4 text-green-600">{{ responseMeggage }}</p>
    </div>

  </div>
</template>