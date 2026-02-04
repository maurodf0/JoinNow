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

const users = ref<Array<{ id: number; role: string; created_at: string; name: string }>>([])
const totalItems = ref<number>(0)
const currentPage = ref<number>(1)

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


</script>

<template>
  <Container>
    <Table>
      <TableCaption>Logged in Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ruolo</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-for="user in users" :key="user.id">
          <TableRow>
            <template v-if="userSupa?.user_metadata?.role == 'admin'">
            <TableCell>
              <Button>Remove</Button>
            </TableCell>
          </template>
          <template v-else>
            ciao
          </template>
            <TableCell class="font-medium">{{ user.role }}</TableCell>
            <TableCell>{{ formatDate(user.created_at) }}</TableCell>
            <TableCell>
              <ClientOnly>
                <AvatarName :name="user.name" :url="avatarUrl" />
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
