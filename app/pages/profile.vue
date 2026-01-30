<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})

const user = useSupabaseUser()
</script>

<template>
    <Container>
        <h1>Profile</h1>
        <AvatarName :name="user?.user_metadata?.name" />
    </Container>
</template>