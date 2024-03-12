<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <router-view></router-view> -->
  <div>
    <RoomList></RoomList>
  </div>
  <!-- <router-view></router-view> -->
  <button
    class="w-[60px] h-[60px] rounded-[100px] bg-signup flex items-center justify-center absolute right-[30px] top-[200px] cursor-pointer shadow-lg"
    @click="onToggle"
  >
    <img
      src="/src/assets/image/house-add-fill.svg"
      alt=""
      class="rounded-circle w-[38px] h-[40px]"
    />
  </button>
  <Modal v-if="isShow" @cancel="onToggle" title="Add new room">
    <template v-slot:body>
      <AddRoom></AddRoom>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import RoomList from './RoomList.vue'
import { ref } from 'vue'
// import AddRoom from './AddRoom.vue'
import Modal from '@/components/Modal.vue'
import AddRoom from './AddRoom.vue'

const isShow = ref<boolean>(false)
const onToggle = () => {
  isShow.value = !isShow.value
}
</script>
<style></style>
