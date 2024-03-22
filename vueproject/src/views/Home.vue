<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1 class="tracking-wider text-[40px] text-center font-bold text-whitereal">Statistic</h1>
    <ul class="text-center text-sub">
      <li>
        <div>
          <img src="/src/assets/image/pin-fill.svg" alt="" class="inline-block" />
          Total user in the house:
          <code class="font-bold text-[30px] text-whitereal">
            {{ useApiUser.totalUsers }}
          </code>
        </div>
      </li>
      <li>
        <div>
          <img src="/src/assets/image/pin-fill.svg" alt="" class="inline-block" />

          Total room in the house:
          <code class="font-bold text-[30px] text-whitereal">
            {{ useApiRoom.totalRooms }}
          </code>
        </div>
      </li>
      <button @click="clickShow()">
        <img src="/src/assets/image/arrow-down-circle-fill.svg" alt="" class="w-[25px] h-[25px]" />
      </button>
      <div v-show="isShow">
        <li>
          Total room using:
          <code class="font-bold text-[30px] text-whitereal">
            {{ useApiRoom.totalRoomUse }}
          </code>
        </li>
        <li>
          Total room empty:
          <code class="font-bold text-[30px] text-whitereal">
            {{ useApiRoom.totalRoomEmpty }}
          </code>
        </li>
        <li>
          Total room repair:
          <code class="font-bold text-[30px] text-whitereal">
            {{ useApiRoom.totalRoomRepair }}
          </code>
        </li>
      </div>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import { useApiUserStore } from '@/stores/storeUser'
import { onMounted, ref } from 'vue'

const useApiUser = useApiUserStore()
const useApiRoom = useRoomStore()

const isShow = ref<boolean>(false)

const clickShow = () => {
  isShow.value = !isShow.value
}

onMounted(async () => {
  await useApiUser.fetchDataUser2()
  await useApiRoom.fetchRoom()
})
</script>
<style></style>
