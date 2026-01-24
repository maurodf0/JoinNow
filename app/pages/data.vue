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

  const response = await $fetch('/api/data');
  const data = await response;
  const avatarUrl = 'https://avatars.githubusercontent.com/u/60851419'

  const users = data.body;

</script>

<template>
  <div>
    <Table>
    <TableCaption>Logged in Users</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          ID
        </TableHead>
        <TableHead>Time</TableHead>
        <TableHead>Name</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-for="{ id, time, name } in users" :key="id">
          <TableRow>
          <TableCell class="font-medium">
            {{ id }}
          </TableCell>
          <TableCell>{{ time }}</TableCell>
          <TableCell>
            <ClientOnly>
              <AvatarName :name="name" :url="avatarUrl" />
            </ClientOnly>
          </TableCell>
        </TableRow>
        </template>
    

    </TableBody>
  </Table>
  </div>
</template>