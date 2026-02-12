
<script setup lang="ts">
const userSupa = useSupabaseUser();
definePageMeta({
  middleware: ['auth']
})
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
import Container from '~/components/site/Container.vue'
import { toast } from 'vue-sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


const route = useRoute()
const id = route.params.id

const user = ref<Array<{ id: number; role: string; created_at: string; name: string; user_id?: string }>>([])
const totalItems = ref<number>(0)
const currentPage = ref<number>(1)
const deletingIds = ref<Set<number>>(new Set())

const getData = async (page: number = 1) => {
  currentPage.value = page
  try {
    const data = await $fetch(`/api/data/${id}`, {
      query: { limit: 10, page }
    })
    
    user.value = data.body;
    console.log(user.value);
    totalItems.value = data.total
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(async () => {
  const user = useSupabaseUser()
  if (!user.value) {
    await navigateTo('/login')
    return
  }
  await getData(1)
})

const pages = computed(() => Math.ceil(totalItems.value / 10))

const avatarUrl = 'https://avatars.githubusercontent.com/u/60851419'

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const removeUser = async (id: number) => {
  if (deletingIds.value.has(id)) return
  
  const toastId = toast.loading('Removing user...')
  deletingIds.value.add(id)
  
  try {
    await $fetch(`/api/data/data`, {
      method: 'delete',
      body: { id }
    })
    await getData(currentPage.value)
    toast.success('User removed successfully', { id: toastId })
  } catch (error: any) {
    console.error('Error removing user:', error)
    toast.error(error.statusMessage || 'Error removing user', { id: toastId })
  } finally {
    deletingIds.value.delete(id)
  }
}

</script>

<template>
  <Container>

<div class="grid grid-cols-4 mb-4">
<Card>
  <CardHeader>
    <CardTitle>N° Presenze Totali</CardTitle>
    <CardDescription>Numero di presenze totali per utente {{ user[0]?.name }}</CardDescription>
  </CardHeader>
  <CardContent class="text-2xl font-bold">
   {{ user.length }}
  </CardContent>
</Card>
</div> 

    <Table>
      <TableCaption>
        <div class="flex items-center justify-between px-4">
          <span>Records for User: {{ id }}</span>
          <NuxtLink to="/data">
            <Button size="sm" variant="outline">Back to All</Button>
          </NuxtLink>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead v-if="userSupa?.user_metadata?.role == 'admin'" class="w-[100px]">Actions</TableHead>
          <TableHead>Ruolo</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Name</TableHead>
     
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="u in user" :key="user.id">
    
          <TableRow>
            <TableCell v-if="userSupa?.user_metadata?.role == 'admin'">
              <Button 
                variant="destructive" 
                size="sm" 
                :disabled="deletingIds.has(u.id)"
                @click="removeUser(user.id)"
              >
                {{ deletingIds.has(u.id) ? 'Removing...' : 'Remove' }}
              </Button>
            </TableCell>
   
            <TableCell class="font-medium">{{ u.role }}</TableCell>
            <TableCell>{{ formatDate(u.created_at) }}</TableCell>
            <TableCell>
              <ClientOnly>
                <AvatarName :name="u.name" :url="avatarUrl" />
              </ClientOnly>
            </TableCell>

          </TableRow>
        </template>
      </TableBody>
    </Table>
  </Container>

  <div class="pagination justify-center flex gap-2 mt-8">
    <template v-for="page in pages" :key="page">
      <div
        class="p-2 px-4 bg-slate-800 hover:bg-slate-700 cursor-pointer transition-all rounded"
        :class="{ 
          '!bg-slate-600 !hover:bg-slate-500 text-white font-semibold shadow-md': page === currentPage 
        }"
        @click="getData(page)"
      >
        {{ page }}
      </div>
    </template>
  </div>
</template>
