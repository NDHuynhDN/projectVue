<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1 class="text-center font-bold text-[50px]">List User</h1>
    <button
      class="w-[60px] h-[60px] rounded-[100px] bg-signup flex items-center justify-center absolute right-[30px] top-[200px] cursor-pointer shadow-lg"
      @click="moveFormAddUser"
    >
      <img
        src="../../assets/image/person-fill-add.svg"
        alt=""
        class="rounded-circle w-[40px] h-[52px]"
      />
    </button>

    <UseList></UseList>
  </div>
</template>
<script lang="ts" setup>
import UseList from './UseList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const moveFormAddUser = () => {
  router.push('/user/addUser')
  // isShow.value = !isShow.value
}
</script>
<style scoped></style>
