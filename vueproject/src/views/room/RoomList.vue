<template>
  <div class="mx-auto w-[1000px] h-[622px] rounded-second p-2 text-white relative">
    <div class="flex justify-around items-center">
      <label class="text-red"> <input type="checkbox" v-model="roomUse" /> Room has user </label>
      <label class="text-green"> <input type="checkbox" v-model="roomEmpty" /> Room Empty </label>
      <label class="text-yellow">
        <input type="checkbox" v-model="roomRepair" /> Room Repair
      </label>
    </div>
    <div v-if="filteredPhongs.length > 0" class="grid grid-cols-4">
      <div
        v-for="(room, index) in filteredPhongs"
        :key="index"
        class="h-[110px] m-1 flex justify-center items-center rounded-second hover:opacity-90 hover:cursor-pointer shadow-sm relative"
        :style="{ backgroundColor: getColorByStatus(room.status) }"
      >
        <div class="flex justify-center items-center" @click="router.push(`/room/${room.id}`)">
          <span class="">
            <code class="font-bold"> Room:</code>
            {{ room.name }} ({{ room.count }})
          </span>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-4">
      <div
        v-for="item in mang"
        :key="item"
        class="h-[110px] m-1 flex justify-center items-center rounded-second border shadow-sm"
      >
        <Skeleton></Skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Skeleton from '@/components/Skeleton.vue'
import router from '@/router'
import { useRoomStore } from '@/stores/room'
import type { Room } from '@/types'

const mang = Array.from({ length: 20 }, (_, index) => index + 1)

// import type { Room } from '@/types'
import { computed, onMounted, ref } from 'vue'

const useApiRoom = useRoomStore()

onMounted(() => {
  try {
    setTimeout(() => useApiRoom.fetchRoom(), 2000)
  } catch (error) {
    console.log('Error', error)
  }
})

const dataRoom = ref<Room[]>([])

// --------------------------------------------
const getColorByStatus = (status: number) => {
  if (status === 1) {
    return 'red'
  } else if (status === 2) {
    return 'green'
  } else {
    return 'gold'
  }
}

// --------------------------------------------
const roomUse = ref<boolean>(false)
const roomEmpty = ref<boolean>(false)
const roomRepair = ref<boolean>(false)

const filteredPhongs = computed<Room[]>(() => {
  if (!roomUse.value && !roomEmpty.value && !roomRepair.value) {
    return useApiRoom.rooms
  } else if (roomUse.value) {
    return useApiRoom.rooms.filter((phong) => phong.status === 1)
  } else if (roomEmpty.value) {
    return useApiRoom.rooms.filter((phong) => phong.status === 2)
  } else if (roomRepair.value) {
    return useApiRoom.rooms.filter((phong) => phong.status === 3)
  } else {
    return []
  }
})
</script>

<style></style>
