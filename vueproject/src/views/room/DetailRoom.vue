<template>
  <div class="modal fade" @click.self="onClose()">
    <div class="modal-dialog">
      <div class="modal-content min-h-[500px] bg-main">
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
                class="p-3 bg-main"
                :disabled="
                  (status.value === 1 && selectedStatus === 2) ||
                  (status.value === 2 && selectedStatus === 1)
                "
              >
                <code>
                  {{ status.label }}
                </code>
              </option>
            </select>
          </div>
          <button class="rounded-second bg-header hover:bg-red px-4 py-2 m-4" @click="onClose()">
            Close
          </button>
        </div>

        <div class="">
          <div v-if="room.status !== 2" class="">
            <div v-if="selectedRoomUsers.length > 0">
              <h2 class="text-center font-bold text-[40px] text-whitereal mb-2">
                User in this room
              </h2>
              <table class="w-[90%] text-center mx-auto">
                <thead class="font-bold text-whitereal bg-header">
                  <tr class="">
                    <th class="border border-header">Id</th>
                    <th class="border border-header">Name</th>
                    <th class="border border-header">Gender</th>
                    <th class="border border-header">Address</th>
                    <th class="border border-header">Phone</th>
                  </tr>
                </thead>
                <tbody class="text-whitereal">
                  <tr class="h-[50px]" v-for="(userInfo, index) in selectedRoomUsers" :key="index">
                    <td class="border-header border">{{ userInfo.id }}</td>
                    <td class="border-header border">{{ userInfo.name }}</td>
                    <td class="border-header border">{{ userInfo.gender }}</td>
                    <td class="border-header border">{{ userInfo.address }}</td>
                    <td class="border-header border">{{ userInfo.phone }}</td>
                    <td>
                      <button class="rounded-second" @click="delUser(userInfo.id)">
                        <img src="../../assets/image/trash3.svg" alt="" class="w-[21px] h-[21px]" />
                      </button>
                    </td>
                  </tr>
                  <tr v-if="isAdding" class="">
                    <td class="border-header border py-1">
                      <input
                        class="text-whitereal text-center ml-2"
                        v-model="infoNewUser.id"
                        placeholder="ID"
                      />
                    </td>
                    <td class="border-header border py-1">
                      <input
                        class="text-whitereal text-center ml-2"
                        v-model="infoNewUser.name"
                        placeholder="Name"
                      />
                    </td>
                    <td class="border-header border py-1">
                      <input
                        class="text-whitereal text-center ml-2"
                        v-model="infoNewUser.gender"
                        placeholder="Gender"
                      />
                    </td>
                    <td class="border-header border py-1">
                      <input
                        class="text-whitereal text-center ml-2"
                        v-model="infoNewUser.address"
                        placeholder="Address"
                      />
                    </td>
                    <td class="border-header border py-1">
                      <input
                        class="text-whitereal text-center ml-2"
                        v-model="infoNewUser.phone"
                        placeholder="Phone"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="absolute bottom-[20px] right-[20px] flex gap-3">
                <button class="bg-header hover:bg-red rounded-second px-4 py-2" @click="onAdd()">
                  {{ isAdding ? 'No Add' : 'Add' }}
                </button>
                <button
                  class="bg-header hover:bg-blue rounded-second px-4 py-2"
                  @click="saveInfo()"
                  :disabled="disableStatus"
                  :class="{
                    'cursor-not-allowed': disableStatus === true,
                    'cursor-pointer': disableStatus === false
                  }"
                >
                  Save add
                </button>
              </div>
            </div>

            <div
              v-else
              class="text-center p-4 mt-[70px] rounded-second w-[650px] mx-auto border-sub border border-dashed shadow-2xl"
            >
              <h2 class="text-center font-bold text-[40px] text-whitereal">
                This room is repairing
              </h2>

              <h1>
                <code class="font-bold text-[30px] tracking-wider"> Note: </code>
                Don't add new user, please change to status "Empty"
              </h1>
            </div>
          </div>
          <div
            v-else
            class="text-center p-4 mt-[70px] rounded-second w-[650px] mx-auto border-sub border border-dashed shadow-2xl"
          >
            <h2 class="text-center font-bold text-[40px] text-whitereal">This room is empty</h2>
            <button
              class="bg-header mt-3 px-3 py-2 rounded-second hover:scale-110 hover:bg-sub text-whitereal hover:text-main hover:font-semibold transition-all"
              @click="router.push('/user/addUser')"
            >
              Add new user
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useApiUserStore } from '@/stores/storeUser'
import type { Room, User } from '@/types'
import axios from 'axios'
import { computed, reactive, ref, defineEmits } from 'vue'

//
const disableStatus = ref<boolean>(true)
const isAdding = ref<boolean>(false)
const onAdd = () => {
  if (props.room.currentCapacity < props.room.maxCapacity) {
    disableStatus.value = false
    isAdding.value = !isAdding.value
  } else {
    // disableStatus.value = false
    disableStatus.value = true
    isAdding.value = false
    alert('This room is full')
  }
}
const useApiUser = useApiUserStore()

// defineProps from parent component
const props = defineProps<{
  room: Room
  selectedRoomUsers: User[]
}>()

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', payload: User): void
  (event: 'delete', payload: number | string): void
  (event: 'updateStatus', payload: any): void
}>()

const selectedStatus = ref<number>(props.room.status)

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

      infoNewUser.id = ''
      infoNewUser.name = ''
      infoNewUser.gender = ''
      infoNewUser.address = ''
      infoNewUser.phone = ''

      disableStatus.value = true
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
