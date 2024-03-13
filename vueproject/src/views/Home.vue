<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1 class="tracking-wider text-[40px] text-center">Statistic</h1>
    <ul class="text-center">
      <li>
        Total user in the house:
        <code class="font-bold text-[30px]">
          {{ useApiUser.totalUsers }}
        </code>
      </li>
      <li>
        Total room in the house:
        <code class="font-bold text-[30px]">
          {{ useApiRoom.totalRooms }}
        </code>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'
import { useApiUserStore } from '@/stores/storeUser'
import { onMounted } from 'vue'

const useApiUser = useApiUserStore()
const useApiRoom = useRoomStore()

onMounted(async () => {
  await useApiUser.fetchDataUser2()
  await useApiRoom.fetchRoom()
})
</script>
<style></style>
