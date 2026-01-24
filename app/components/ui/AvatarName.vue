<script setup lang="ts">
defineProps<{
    name: string,
    url: string
  }>()
</script>

<template>
  <div class="user flex gap-2 items-center">
  {{ name }}
            <Avatar>
            <AvatarImage :src="url" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
    </div>
</template>