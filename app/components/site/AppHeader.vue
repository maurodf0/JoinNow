<script setup lang="ts">
import AvatarName from '../ui/AvatarName.vue';

const user = useSupabaseUser();
const email = computed(() => user.value?.email || 'Guest');

console.log(user);
</script>

<template>
  <header class="w-full border border-b">
    <nav class="container mx-auto flex items-center justify-between p-4">
      <NuxtLink to="/" class="text-lg font-bold">JoinNow</NuxtLink>
      <div class="space-x-4">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/data" class="hover:underline">Data</NuxtLink>
        <template v-if="!user">
          <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
          <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
        </template>
       
      </div>
      <template v-if="user">
        <NuxtLink to="/profile" class="hover:underline">
          <AvatarName :name="user?.user_metadata?.name" :url="user?.user_metadata?.avatar_url" />
        </NuxtLink>
      </template>
    
    </nav>
  </header>
</template>