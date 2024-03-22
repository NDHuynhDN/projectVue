<template>
  <form class="flex flex-col gap-3 items-center w-[600px] mx-auto" @submit.prevent="saveInfoAdd">
    <!-- <label for="" class="">Name: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter id . . ."
      v-model="formData.id"
    />
    <!-- <label for="" class="flex-1">Username: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter name . . ."
      v-model="formData.maxCapacity"
    />
    <!-- <label for="">Gender: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter number . . ."
      v-model="formData.currentCapacity"
    />
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter status . . ."
      v-model="formData.status"
    />
    <button class="bg-login m-2 rounded-second px-3 py-2">Add room</button>
  </form>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import type { Room } from '@/types'
import { reactive } from 'vue'

const useApiRoom = useRoomStore()

const formData = reactive<Room>({
  id: 601,
  maxCapacity: 4,
  currentCapacity: 0,
  status: 2
})

const saveInfoAdd = async () => {
  await useApiRoom.addRoom(formData)
  alert('add successful!!')
}
</script>
