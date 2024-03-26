<template>
  <form class="flex flex-col gap-3 items-center w-[600px] mx-auto" @submit.prevent="">
    <!-- <label for="" class="">Name: </label> -->
    <input
      type="text"
      class="text-whitereal px-3 shadow-2xl py-2 rounded-second w-[600px]"
      placeholder="Enter id . . ."
    />
    <!-- <label for="" class="flex-1">Username: </label> -->
    <input
      type="text"
      class="text-whitereal px-3 shadow-2xl py-2 rounded-second w-[600px]"
      placeholder="Enter name . . ."
    />
    <!-- <label for="">Gender: </label> -->
    <input
      type="text"
      class="text-whitereal px-3 shadow-2xl py-2 rounded-second w-[600px]"
      placeholder="Enter number . . ."
    />
    <input
      type="text"
      class="text-whitereal px-3 shadow-2xl py-2 rounded-second w-[600px]"
      placeholder="Enter status . . ."
    />
    <button
      class="bg-header mt-3 px-3 py-2 rounded-second hover:scale-110 hover:bg-sub text-whitereal hover:text-main hover:font-semibold transition-all"
    >
      Add room
    </button>
  </form>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import type { Room } from '@/types'
import { reactive } from 'vue'

const useApiRoom = useRoomStore()

// const formData = reactive<Room>({
//   // id: ,
//   // maxCapacity: 4,
//   // currentCapacity: 0,
//   // status:
// })

// const saveInfoAdd = async () => {
//   await useApiRoom.addRoom(formData)
//   alert('add successful!!')
// }
</script>
