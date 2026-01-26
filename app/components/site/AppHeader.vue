<script setup lang="ts">
import AvatarName from '../ui/AvatarName.vue';

const user = useSupabaseUser();

const email = computed(() => user.value?.email || 'Guest');

async function signOut() {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
}
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
        <template v-else>
          <NuxtLink @click.prevent="signOut"  class="hover:underline">Logout</NuxtLink>
        </template>
      </div>
      <AvatarName :name="email" />
    </nav>
  </header>
</template>