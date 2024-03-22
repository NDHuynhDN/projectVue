<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="mx-auto text-center bg-[#526D82] rounded-primary w-[190px] shadow-md mt-[30px] flex items-center justify-center gap-2 py-2"
  >
    <img src="../assets/image/clock-fill.svg" alt="" class="text-lg text-white w-5 h-5" />
    <code class="text-capitalize text-lg text-white">{{ currentTime }}</code>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const currentTime = ref<string>('')
const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}
onMounted(() => {
  setInterval(() => {
    updateTime()
  }, 1000)

  updateTime() // Gọi updateTime lần đầu để khởi tạo giá trị ban đầu
})
</script>

<style></style>
