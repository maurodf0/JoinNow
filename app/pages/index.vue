<script setup lang="ts">

const responseMessage = ref<string>("");
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
  responseMessage.value = data.message;
  setTimeout(() => {
    responseMessage.value = '';
  }, 4000);
} catch (error) {
  console.error("Error joining person:", error);
}
}
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div class="container">
      <Button 
      @click="joinPerson">
        Click me
        <template v-if="loading">
           <Spinner class="size-3 text-red" />
        </template>
      </Button>
      <Spinner />
      <p v-if="responseMessage" class="mt-4 text-green-600">{{ responseMessage }}</p>
    </div>

  </div>
</template>