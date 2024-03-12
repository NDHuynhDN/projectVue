<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="w-full bg-signup h-[70px] flex items-center justify-between px-7 text-whitereal shadow-md"
  >
    <h1 @click="router.push('/home')" class="cursor-pointer font-extrabold text-[50px] ml-4">
      Our House
    </h1>
    <div class="flex gap-6 items-center">
      <div>
        <div v-if="useAPIAccount.accountUser.length > 0">
          <h1 v-for="(account, index) in useAPIAccount.accountUser" :key="index">
            Welcome:
            <code class="font-bold text-[28px]"> {{ account.username }} </code>
          </h1>
        </div>
        <div v-else>
          <h1>
            Welcome:
            <code class="font-bold text-[28px]"> Admin </code>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
const useAPIAccount = useAuthStore()
console.log(useAPIAccount.accountUser)
</script>
<style scoped></style>
