<template>
  <div class="text-center h-[500px]">
    <div class="flex justify-between items-center">
      <div v-if="roomData" class="ml-3 font-thin">
        Room: {{ roomData.name }} - Status:
        {{
          roomData.status === 1
            ? 'Phòng đang được thuê'
            : roomData.status === 2
              ? 'Phòng còn trống'
              : roomData.status === 3
                ? 'Phòng đang sửa chữa'
                : ''
        }}
        - Số lượng người: {{ roomData.count }}
      </div>
      <button
        class="rounded-primary bg-login px-5 py-2 w-[100px] m-4"
        @click="router.push('/room')"
      >
        Close
      </button>
    </div>

    <div class="">
      <table v-if="userInRoom" class="w-[500px]">
        <thead class="">
          <tr class="">
            <th class="border">id</th>
            <th class="border">Tên</th>
            <th class="border">Giới tính</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="(userInfo, index) in userInRoom" :key="index">
            <td class="border px-3 py-1">{{ userInfo.id }}</td>
            <td class="border px-3 py-1">{{ userInfo.name }}</td>
            <td class="border px-3 py-1">{{ userInfo.gender }}</td>
            <td class="flex gap-2 items-center justify-center">
              <button>Xóa</button>
              <button>Sửa</button>
            </td>
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
  fetchEachRoom()
  fetchUserInRoom(route.params.id)
})
</script>
<style scoped></style>
