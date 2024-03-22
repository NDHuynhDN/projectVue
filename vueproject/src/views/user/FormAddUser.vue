<template>
  <form class="flex flex-col gap-2 w-[600px] mx-auto" @submit.prevent="saveInforAdd">
    <h1 class="text-center text-[40px] font-bold text-whitereal">Add new user</h1>
    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter name . . ."
      v-model="formData.name"
    />
    <!-- <span v-if="inputEmptyError" class="text-red">{{ inputEmptyError }}</span> -->
    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter username . . ."
      v-model="formData.username"
    />
    <span v-if="inputUserNameError" class="text-red">{{ inputUserNameError }}</span>

    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter gender (male or female) . . ."
      v-model="formData.gender"
    />
    <!-- <span v-if="inputEmptyError" class="text-red">{{ inputEmptyError }}</span> -->

    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter address . . ."
      v-model="formData.address"
    />
    <!-- <span v-if="inputEmptyError" class="text-red">{{ inputEmptyError }}</span> -->

    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter identify code . . . "
      v-model="formData.identify"
    />
    <!-- <span v-if="inputEmptyError" class="text-red">{{ inputEmptyError }}</span> -->

    <input
      type="text"
      class="text-whitereal px-3 shadow-md py-3 rounded-second w-[600px]"
      placeholder="Enter phone . . ."
      v-model="formData.phone"
    />
    <select
      class="text-header px-3 shadow-md py-3 rounded-second w-[600px]"
      v-model="formData.room_id"
    >
      <option value="" selected disabled hidden>Choose room</option>
      <option v-for="room in useApiRoom.rooms" :value="room.id" :key="room.id">
        {{ room.id }}
      </option>
    </select>
    <!-- <span v-if="inputEmptyError" class="text-red">{{ inputEmptyError }}</span> -->

    <button class="w-full px-3 py-2 bg-header rounded-second text-whitereal">Add</button>
  </form>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import { useApiUserStore } from '@/stores/storeUser'
import type { Room, User } from '@/types'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// use Store
const useApiUser = useApiUserStore()
const useApiRoom = useRoomStore()
// v-modal input
const formData = reactive<User>({
  id: 0,
  name: '',
  username: '',
  identify: '',
  address: '',
  phone: '',
  gender: '',
  room_id: 0
})

onMounted(() => {
  useApiRoom.fetchRoom()
})

// validate
const inputUserNameError = ref<string>('')

const validateUsername = () => {
  inputUserNameError.value =
    formData.username.length >= 2 ? '' : 'At least 2 characters and is required'
}

// save
const saveInforAdd = async () => {
  try {
    validateUsername()
    if (!inputUserNameError.value) {
      const roomId = formData.room_id
      const room: Room = await useApiRoom.fetchRoomById(roomId)
      // update status & count
      if (room.currentCapacity >= room.maxCapacity) {
        alert('Room is already full. Cannot and more users')
        return
      }
      await useApiUser.addUser(formData)
      if (room.status === 2) {
        room.currentCapacity += 1
        room.status = 1
        await useApiRoom.updateRoomAddUser(roomId, {
          currentCapacity: room.currentCapacity,
          status: room.status,
          maxCapacity: room.maxCapacity
        })
        alert('Add successfully !!!')
        router.push('/user')
      } else if (room.status === 3) {
        alert("Don't add repair room")
      } else {
        room.currentCapacity += 1
        await useApiRoom.updateRoomAddUser(roomId, {
          currentCapacity: room.currentCapacity,
          status: room.status,
          maxCapacity: room.maxCapacity
        })
        alert('Add successfully !!!')
        router.push('/user')
      }
    } else {
      console.log('Form has errors. Please fix them.')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
