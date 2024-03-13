<template>
  <div class="mx-auto rounded-primary p-2 text-white">
    <div class="flex justify-around items-center">
      <label class="text-blue">
        <input type="radio" v-model="roomStatus" value="all" /> All Room
      </label>
      <label class="text-red">
        <input type="radio" v-model="roomStatus" value="hasUser" /> Room Has User
      </label>
      <label class="text-green">
        <input type="radio" v-model="roomStatus" value="empty" /> Room Empty
      </label>
      <label class="text-yellow">
        <input type="radio" v-model="roomStatus" value="repair" /> Room Repair
      </label>
    </div>
    <div v-if="filteredPhongs.length > 0" class="grid grid-cols-4">
      <div
        v-for="(room, index) in filteredPhongs"
        :key="index"
        class="m-1 h-[100px] flex justify-center items-center rounded-primary"
        :style="{ backgroundColor: getColorByStatus(room.status) }"
      >
        <div
          class="w-full h-full flex items-center justify-center hover:cursor-pointer hover:opacity-70"
          @click="onClickRoom(room.id)"
        >
          <code class="font-bold"> Room:</code>
          {{ room.name }} ({{ room.count }})
        </div>
        <DetailRoom
          v-if="selectedRoom && selectedRoom.id === room.id"
          :room="room"
          :selectedRoomUsers="selectedRoomUsers"
          @cancel="onCancelDetail"
          @delete="deleteUser"
          @save="saveAddUser"
        ></DetailRoom>
      </div>
    </div>

    <div v-else class="grid grid-cols-4">
      <div
        v-for="item in mang"
        :key="item"
        class="m-1 h-[100px] flex justify-center items-center rounded-primary border shadow-sm"
      >
        <Skeleton></Skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Skeleton from '@/components/Skeleton.vue'
import { useRoomStore } from '@/stores/room'
import DetailRoom from './DetailRoom.vue'
import type { Room, RoomStatus, User } from '@/types'
const mang = Array.from({ length: 20 }, (_, index) => index + 1)

// import type { Room } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useApiUserStore } from '@/stores/storeUser'

const useApiRoom = useRoomStore()
const useApiUser = useApiUserStore()

onMounted(() => {
  try {
    setTimeout(async () => {
      await useApiRoom.fetchRoom()
      roomStatus.value = 'all'
      await useApiUser.fetchDataUser2()
    }, 2000)
  } catch (error) {
    console.log('Error', error)
  }
})

//------------------------------
const getColorByStatus = (status: number) => {
  if (status === 1) {
    return 'red'
  } else if (status === 2) {
    return 'green'
  } else {
    return 'gold'
  }
}
//------------------------------------------
const roomStatus = ref<RoomStatus>('')
const filteredPhongs = computed<Room[]>(() => {
  if (!roomStatus.value) {
    return useApiRoom.rooms
  }
  return useApiRoom.rooms.filter((phong) => {
    switch (roomStatus.value) {
      case 'hasUser':
        return phong.status === 1
      case 'empty':
        return phong.status === 2
      case 'repair':
        return phong.status === 3
      case 'all':
        return useApiRoom.rooms
      default:
        return false
    }
  })
})
// ------------------------------------------
const selectedRoom = ref<Room | null>(null)
const selectedRoomUsers = ref<User[]>([])

const onCancelDetail = () => {
  selectedRoom.value = null
}
const onClickRoom = (roomId: number | string) => {
  selectedRoom.value = useApiRoom.rooms.find((room) => room.id === roomId) || null
  selectedRoomUsers.value = useApiUser.userData.filter((user) => user.room_id === roomId)
}

const deleteUser = (userId: number | string) => {
  const message = confirm('Xac nhan xoa')
  if (message == true) {
    if (selectedRoomUsers.value) {
      selectedRoomUsers.value = selectedRoomUsers.value.filter((user) => user.id !== userId)
    }
  } else {
    return
  }
}

const saveAddUser = (newUser: User) => {
  if (selectedRoomUsers.value) {
    newUser.room_id = selectedRoomUsers.value[0].room_id
    selectedRoomUsers.value.push(newUser)
  }
}
// ---------------------------------
</script>

<style></style>
