<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-2 p-2 shadow-xl rounded-primary text-whitereal">
    <div class="mt-[20px] ml-[10px] flex flex-col gap-[20px]">
      <div
        class="w-full bg-signup p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="router.push('/homepage')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets/image/house-door-fill.svg" alt="" />
        Home page
      </div>
      <div
        class="w-full bg-signup p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="router.push('/user')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets/image/person-fill-gear.svg" alt="" />
        Manage user
      </div>
      <div
        class="w-full bg-signup p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="router.push('/room')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/house-gear-fill.svg" alt="" />
        Manage room
      </div>
      <div
        class="w-full bg-signup p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="router.push('/profile')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/gear-fill.svg" alt="" />
        Setting
      </div>
      <div
        class="w-full bg-signup p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="router.push('/')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/box-arrow-right.svg" alt="" />
        Logout
      </div>
    </div>
    <Clock></Clock>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import Clock from './Clock.vue'
</script>
