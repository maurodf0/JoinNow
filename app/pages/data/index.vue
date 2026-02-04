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

const users = ref<Array<{ id: number; role: string; created_at: string; name: string }>>([])
const totalItems = ref<number>(0)
const currentPage = ref<number>(1)
const deletingIds = ref<Set<number>>(new Set())

const getData = async (page: number = 1) => {
  currentPage.value = page
  try {
    const data = await $fetch('/api/data', {
      query: { limit: 10, page }
    })
    
    users.value = data.body;
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
    await $fetch('/api/data', {
      method: 'DELETE',
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
    <Table>
      <TableCaption>Logged in Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead v-if="userSupa?.user_metadata?.role == 'admin'" class="w-[100px]">Actions</TableHead>
          <TableHead>Ruolo</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Name</TableHead>
          <TableHead class="text-right">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="user in users" :key="user.id">
    
          <TableRow>
            <TableCell v-if="userSupa?.user_metadata?.role == 'admin'">
              <Button 
                variant="destructive" 
                size="sm" 
                :disabled="deletingIds.has(user.id)"
                @click="removeUser(user.id)"
              >
                {{ deletingIds.has(user.id) ? 'Removing...' : 'Remove' }}
              </Button>
            </TableCell>
   
            <TableCell class="font-medium">{{ user.role }}</TableCell>
            <TableCell>{{ formatDate(user.created_at) }}</TableCell>
            <TableCell>
              <ClientOnly>
                <AvatarName :name="user.name" :url="avatarUrl" />
              </ClientOnly>
            </TableCell>
     
            <TableCell class="text-right">
              <NuxtLink :to="`/data/${user.id}`">
                <Button size="sm" variant="outline">More</Button>
              </NuxtLink>
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
