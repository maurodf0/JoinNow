<script setup lang="ts">
import AppFooter from '~/components/site/AppFooter.vue';
import AppHeader from '~/components/site/AppHeader.vue';

</script>

<template>
  <AppHeader />
  <slot />
  <AppFooter />
</template>