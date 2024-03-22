<template>
  <div class="modal fade" @click.self="onClose()">
    <div class="modal-dialog">
      <div class="modal-content h-[500px] bg-main">
        <div class="flex justify-between items-center">
          <div class="ml-3 font-thin text-whitereal">
            Room:
            <code class="font-bold text-[30px]">
              {{ props.room.id }}
            </code>
            - Capacity:
            <code class="text-[30px] font-bold"> {{ props.room.currentCapacity }}</code>
            <code class="text-[30px] font-bold"
              >/<!-- <input type="text" v-model="maxUser" /> -->{{ props.room.maxCapacity }}
            </code>
            - Status:
            <select
              v-model="selectedStatus"
              class="font-bold text-[30px] cursor-pointer"
              @change="handleChangeStatus"
            >
              <option
                v-for="(status, index) in statusOptions"
                :key="index"
                :value="status.value"
                class="p-3"
              >
                <code>
                  {{ status.label }}
                </code>
              </option>
            </select>
          </div>
          <button class="rounded-second bg-header hover:bg-red px-4 py-2 m-4" @click="onClose()">Close</button>
        </div>

        <div class="">
          <h2 class="text-center font-bold text-[40px] text-whitereal">User in Room</h2>
          <div v-if="selectedRoomUsers.length > 0" class="">
            <table class="w-[90%] ml-3 text-center mx-auto">
              <thead class="font-bold text-whitereal">
                <tr class="">
                  <th class="border">Id</th>
                  <th class="border">Name</th>
                  <th class="border">Gender</th>
                  <th class="border">Address</th>
                  <th class="border">Phone</th>
                </tr>
              </thead>
              <tbody class="text-whitereal">
                <tr class="h-[50px]" v-for="(userInfo, index) in selectedRoomUsers" :key="index">
                  <td class="border">{{ userInfo.id }}</td>
                  <td class="border">{{ userInfo.name }}</td>
                  <td class="border">{{ userInfo.gender }}</td>
                  <td class="border">{{ userInfo.address }}</td>
                  <td class="border">{{ userInfo.phone }}</td>
                  <td>
                    <button class="rounded-second" @click="delUser(userInfo.id)">
                      <img src="../../assets/image/trash3.svg" alt="" class="w-[21px] h-[21px]" />
                    </button>
                  </td>
                </tr>
                <tr v-if="isAdding" class="">
                  <td class="border py-1">
                    <input class="text-whitereal ml-2" v-model="infoNewUser.id" placeholder="ID" />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal ml-2"
                      v-model="infoNewUser.name"
                      placeholder="Name"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal ml-2"
                      v-model="infoNewUser.gender"
                      placeholder="Gender"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal ml-2"
                      v-model="infoNewUser.address"
                      placeholder="Address"
                    />
                  </td>
                  <td class="border py-1">
                    <input
                      class="text-whitereal ml-2"
                      v-model="infoNewUser.phone"
                      placeholder="Phone"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="text-[30px] text-red italic text-center">Room empty</p>
          <div class="float-right mr-4 flex gap-3 mt-[50px]">
            <button class="bg-header hover:bg-red rounded-second px-4 py-2" @click="onAdd()">
              {{ isAdding ? 'NoAdd' : 'Add' }}
            </button>
            <button class="bg-header hover:bg-blue rounded-second px-4 py-2" @click="saveInfo()">
              Save add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useApiUserStore } from '@/stores/storeUser'
import type { Room, User } from '@/types'
import axios from 'axios'
import { computed, reactive, ref, defineEmits } from 'vue'

//
const isAdding = ref<boolean>(false)
const onAdd = () => {
  isAdding.value = !isAdding.value
}
const useApiUser = useApiUserStore()

// defineProps from parent component
const props = defineProps<{
  room: Room
  selectedRoomUsers: User[]
}>()

const selectedStatus = ref<number>(props.room.status)

const maxUser = ref<number>(props.room.maxCapacity)

const statusOptions = [
  { label: 'Using', value: 1 },
  { label: 'Empty', value: 2 },
  { label: 'Repair', value: 3 }
]
const handleChangeStatus = () => {
  emit('updateStatus', {
    roomId: props.room.id,
    newStatus: selectedStatus.value,
    currentCapacity: props.room.currentCapacity,
    maxCapacity: props.room.maxCapacity
  })
}

// binding data
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
// defineProps to parent component
const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', payload: User): void
  (event: 'delete', payload: number | string): void
  (event: 'updateStatus', payload: any): void
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
.modal {
  background-color: rgba(247, 245, 248, 0.61);
  
}
</style>
