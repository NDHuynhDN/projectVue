<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-2 p-2 shadow-xl rounded-primary text-whitereal">
    <div class="mt-[20px] ml-[10px] flex flex-col gap-[20px]">
      <div
        class="w-full hover:bg-header p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        :class="{ active: currentRoute === 'static' || !currentRoute }"
        @click="navigateTo('static')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets/image/house-door-fill.svg" alt="" />
        Home page
      </div>
      <div
        class="w-full hover:bg-header p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        :class="{ active: currentRoute === 'user' }"
        @click="navigateTo('user')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets/image/person-fill-gear.svg" alt="" />
        Manage user
      </div>
      <div
        class="w-full hover:bg-header p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        :class="{ active: currentRoute === 'room' }"
        @click="navigateTo('room')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/house-gear-fill.svg" alt="" />
        Manage room
      </div>
      <div
        class="w-full hover:bg-header p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        :class="{ active: currentRoute === 'setting' }"
        @click="navigateTo('setting')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/gear-fill.svg" alt="" />
        Setting
      </div>
      <div
        class="w-full hover:bg-header p-2 rounded-primary flex items-center gap-2 cursor-pointer select-none"
        @click="navigateTo('login')"
      >
        <img class="w-[30px] h-[30px] ml-1" src="../assets//image/box-arrow-right.svg" alt="" />
        Logout
      </div>
    </div>
    <Clock></Clock>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import Clock from './Clock.vue'

import { useRoute, useRouter } from 'vue-router'

let currentRoute = ref(useRoute().name)
const router = useRouter()

const navigateTo = (routeName: string) => {
  if (currentRoute.value !== routeName) {
    currentRoute.value = routeName
    router.push({ name: routeName })
  }
}
</script>
<style>
.active {
  @apply bg-sub;
}
</style>
