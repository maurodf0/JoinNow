<script setup lang="ts">

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AvatarName from '@/components/ui/AvatarName.vue'
import Container from '~/components/site/Container.vue';

const users = ref<Array<{ id: number; role: string; created_at: string; name: string }>>([]);
const totalItems = ref<number>(0);

const getData = async (page: number = 1) => {
  try {
  const data = await $fetch('/api/data', {
    query: {
      limit: 10,
      page: page
    }
  });

  users.value = data.body;
  totalItems.value = data.total;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
onMounted(async () =>
await getData()
);


const pages = computed(() => {
  return Math.ceil(totalItems.value / 10);
}); 

const avatarUrl = 'https://avatars.githubusercontent.com/u/60851419'


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

</script>

<template>
  
  <Container>
    <Table>
    <TableCaption>Logged in Users</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>
          Ruolo
        </TableHead>
        <TableHead>Time</TableHead>
        <TableHead>Name</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-for="{ role, created_at, name } in users" :key="id">
          <TableRow>
          <TableCell class="font-medium">
            {{ role }}
          </TableCell>
          <TableCell>{{ formatDate(created_at) }}</TableCell>
          <TableCell>
            <ClientOnly>
              <AvatarName :name="name" :url="avatarUrl" />
            </ClientOnly>
          </TableCell>
        </TableRow>
        </template>
    

    </TableBody>
  </Table>
  </Container>

  <div class="pagination justify-center flex gap-2">
  <template v-for="page in pages" :key="page">
    <div @click="getData(page)" class="page">{{ page }}</div>
  </template>
</div>
</template>