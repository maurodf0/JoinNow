<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'developer', label: 'Developer' },
  { value: 'worker', label: 'Worker' },
  { value: 'other', label: 'Other' },
]

const role = ref<string>('')
const email = ref<string>('')
const name = ref<string>('')
const emit = defineEmits<{
  (e: 'dialogSubmit', name: string, role: string, email: string): void
}>()


const props = defineProps<{
  title: string
  description: string
  buttonText: string
}>()
</script>

<template>
  <Dialog>
    <form @submit.prevent="emit('dialogSubmit', name, role)">
      <DialogTrigger as-child>
        <Button variant="outline">
          {{ props.buttonText }}
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ props.title }}</DialogTitle>
          <DialogDescription>{{ props.description }}</DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <label for="name-1" class="text-sm font-medium leading-none">Name</label>
            <Input id="name-1" name="name" v-model="name" />
          </div>
          <div class="grid gap-3">
            <label for="email" class="text-sm font-medium leading-none">Email</label>
            <Input id="email" name="email" v-model="email" />
          </div>
          <div class="grid gap-3">
            <label for="role" class="text-sm font-medium leading-none">Role</label>
            <Select id="role" name="role" v-model="role">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="role in roles" :key="role.value" :value="role.value">
                <span>{{ role.label }}</span>
              </SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" @click="emit('dialogSubmit', name, role, email)">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
