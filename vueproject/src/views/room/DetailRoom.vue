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
                    <button class="bg-login ml-2 rounded-second px-3" @click="delUser(userInfo.id)">
                      Del
                    </button>
                  </td>
                </tr>
                <tr v-if="isAdding" class="">
                  <td class="border py-1">
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.id"
                      placeholder="ID"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.name"
                      placeholder="Name"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.gender"
                      placeholder="Gender"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal text-center"
                      v-model="infoNewUser.address"
                      placeholder="Address"
                    />
                  </td>
                  <td class="border py-1">
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
            <button class="bg-login rounded-second px-3 py-1" @click="saveInfo()">Save add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import { useApiUserStore } from '@/stores/storeUser'
import type { Room, User } from '@/types'
import axios from 'axios'
import { computed, reactive, ref, watch } from 'vue'

const isAdding = ref<boolean>(false)

const onAdd = () => {
  isAdding.value = !isAdding.value
}
const useApiUser = useApiUserStore()
// const isDisable = ref<boolean>(false)
const props = defineProps<{
  room: Room
  selectedRoomUsers: User[]
}>()
const infoNewUser = reactive<User>({
  id: '',
  name: '',
  username: '',
  identify: '',
  address: '',
  phone: '',
  gender: '',
  room_id: props.room.id
})

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', payload: User): void
  (event: 'delete', payload: number | string): void
}>()

const onClose = () => {
  emit('cancel')
}

const isEmpty = computed(() => {
  return (
    infoNewUser.id !== '' &&
    infoNewUser.name !== '' &&
    infoNewUser.gender !== '' &&
    infoNewUser.address !== '' &&
    infoNewUser.phone !== ''
  )
})

const saveInfo = async () => {
  try {
    if (isEmpty.value) {
      const res = await axios.post('http://localhost:3000/users', infoNewUser)
      alert('Save successful')
      emit('save', res.data)
      isAdding.value = false
    } else {
      alert('Enter new infor user')
    }
  } catch (error) {
    console.log(error)
  }
}

const delUser = async (id: number | string) => {
  try {
    await useApiUser.delDataUser(id)
    emit('delete', id)
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped>
.modal-dialog {
  max-width: 90%;
}
</style>
