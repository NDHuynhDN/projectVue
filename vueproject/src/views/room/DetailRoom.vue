<template>
  <div class="modal fade" @click.self="onClose()">
    <div class="modal-dialog">
      <div class="modal-content bg-signup">
        <div class="flex justify-between items-center">
          <div v-if="props.room" class="ml-3 font-thin">
            Room:
            <code class="font-bold text-[30px]">
              {{ props.room.name }}
            </code>
            - Status:
            <code class="font-bold text-[30px]">
              {{
                props.room.status === 1
                  ? 'has user'
                  : props.room.status === 2
                    ? 'empty'
                    : props.room.status === 3
                      ? 'is reparing'
                      : ''
              }}
            </code>

            - Số lượng người:
            <code class="font-bold text-[30px]">
              {{ props.room.count }}
            </code>
          </div>
          <button class="rounded-second bg-login px-3 py-1 m-4" @click="onClose()">Close</button>
        </div>

        <div class="">
          <h2 class="text-center font-bold text-[40px]">User in Room</h2>
          <div v-if="selectedRoomUsers.length > 0" class="">
            <table class="max-w-[800px] mx-auto">
              <thead class="bg-login font-bold">
                <tr class="">
                  <th class="border">Id</th>
                  <th class="border">Name</th>
                  <th class="border">Gender</th>
                  <th class="border">Address</th>
                  <th class="border">Phone</th>
                </tr>
              </thead>
              <tbody class="">
                <tr class="" v-for="(userInfo, index) in selectedRoomUsers" :key="index">
                  <td class="border px-3 py-1">{{ userInfo.id }}</td>
                  <td class="border px-3 py-1">{{ userInfo.name }}</td>
                  <td class="border px-3 py-1">{{ userInfo.gender }}</td>
                  <td class="border px-3 py-1">{{ userInfo.address }}</td>
                  <td class="border px-3 py-1">{{ userInfo.phone }}</td>
                  <td>
                    <button class="bg-login">Del</button>
                  </td>
                </tr>
                <tr v-if="isAdding" class="">
                  <td>
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.id"
                      placeholder="ID"
                    />
                  </td>
                  <td>
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.name"
                      placeholder="Name"
                    />
                  </td>
                  <td>
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.gender"
                      placeholder="Gender"
                    />
                  </td>
                  <td>
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.address"
                      placeholder="Address"
                    />
                  </td>
                  <td>
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.phone"
                      placeholder="Phone"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="text-[30px] text-red italic">Room empty</p>
          <div class="float-right mr-4 flex gap-3 mb-2">
            <button class="bg-login rounded-second px-3 py-1" @click="onAdd()">
              {{ isAdding ? 'NoAdd' : 'Add' }}
            </button>
            <button class="bg-login rounded-second px-3 py-1" @click="saveInfo()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Room, User } from '@/types'
import axios from 'axios'
import { reactive, ref } from 'vue'

const isAdding = ref<boolean>(false)

const onAdd = () => {
  isAdding.value = !isAdding.value
}

const infoNewUser = reactive<User>({
  id: 0,
  name: '',
  username: '',
  identify: '',
  address: '',
  phone: '',
  gender: ''
})

const props = defineProps<{
  room: Room
  selectedRoomUsers: User[]
}>()

const tempArrayUsers = reactive<User[]>([...props.selectedRoomUsers])

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', payload: User): void
}>()

const onClose = () => {
  emit('cancel')
}

const saveInfo = () => {
  tempArrayUsers.push({ ...infoNewUser })
  isAdding.value = false
}
</script>
<style scoped>
.modal-dialog {
  max-width: 90%;
}
</style>
