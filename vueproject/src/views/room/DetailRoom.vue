<template>
  <div class="text-center h-[500px]">
    <div class="flex justify-between items-center">
      <div v-if="roomData" class="ml-3 font-thin">
        Room:
        <code class="font-bold text-[30px]">
          {{ roomData.name }}
        </code>
        - Status:
        <code class="font-bold text-[30px]">
          {{
            roomData.status === 1
              ? 'có người ở'
              : roomData.status === 2
                ? 'phòng trống'
                : roomData.status === 3
                  ? 'đang sửa'
                  : ''
          }}
        </code>

        - Số lượng người:
        <code class="font-bold text-[30px]">
          {{ roomData.count }}
        </code>
      </div>
      <button
        class="rounded-primary bg-login px-5 py-2 w-[100px] m-4"
        @click="router.push('/room')"
      >
        Close
      </button>
    </div>

    <div class="text-center">
      <h2 class="font-semnibold text-[30px]">User in Room</h2>
      <table v-if="userInRoom" class="w-[700px] mx-auto">
        <thead class="bg-login font-bold">
          <tr class="">
            <th class="border">Id</th>
            <th class="border">Name</th>
            <th class="border">Gender</th>
            <th class="border">Address</th>
            <th class="border">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="(userInfo, index) in userInRoom" :key="index">
            <td class="border px-3 py-1">{{ userInfo.id }}</td>
            <td class="border px-3 py-1">{{ userInfo.name }}</td>
            <td class="border px-3 py-1">{{ userInfo.gender }}</td>
            <td class="border px-3 py-1">{{ userInfo.address }}</td>
            <td class="border px-3 py-1">{{ userInfo.phone }}</td>
            <!-- <td class="flex gap-2 items-center justify-center">
              <button>Xóa</button>
              <button>Sửa</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useRoomStore } from '@/stores/room'
import { useApiUserStore } from '@/stores/storeUser'
import type { Room, User } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// import RoomItem from './RoomItem.vue'

const useApiRoom = useRoomStore()

const useApiUser = useApiUserStore()

const route = useRoute()

const roomData = ref<Room>()

const fetchEachRoom = async () => {
  try {
    const res = await useApiRoom.fetchRoomById(route.params.id)
    if (res) {
      roomData.value = res
    } else {
      console.log('error')
    }
  } catch (error) {
    console.log('Error', error)
  }
}

const userInRoom = ref<User[]>([])
const fetchUserInRoom = (roomId: number | string | string[]) => {
  useApiUser.fetchDataUser2()
  if (useApiUser.userData) {
    const userInThisRoom = useApiUser.userData.filter((u) => u.room_id == roomId)
    if (userInThisRoom.length > 0) {
      userInRoom.value = userInThisRoom
    }
    // else {
    //   alert('Phòng này chưa có người')
    // }
  } else {
    console.log('Lỗi')
  }
}
onMounted(() => {
  fetchUserInRoom(route.params.id)
  fetchEachRoom()
})
</script>
<style scoped></style>

<!-- <code class="font-bold text-[30px]">
  {{
    roomData.status === 1
      ? 'Phòng đang được thuê'
      : roomData.status === 2
        ? 'Phòng còn trống'
        : roomData.status === 3
          ? 'Phòng đang sửa chữa'
          : ''
  }}
</code> -->
