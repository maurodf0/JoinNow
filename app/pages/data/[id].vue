
<script setup lang="ts">
    const route = useRoute()
    const id = route.params.id
    console.log(id)
</script>


<template>
    <Container>
        <div>
            <h1>{{ id }}</h1>
        </div>
    </Container>
</template>
