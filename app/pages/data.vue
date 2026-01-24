<script setup lang="ts">

  const response = await $fetch('/api/data');
  const data = await response;

</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>