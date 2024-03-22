<template>
  <div class="">
    <!-- <LoginView></LoginView> -->
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const transitionName = computed(() => {
  // Điều hướng giữa các route để xác định hiệu ứng chuyển động phù hợp
  return route.name === 'login' ? 'slide-right' : 'slide-left'
})
</script>
<style>
/* CSS */
/* CSS */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 1s ease-in;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-150%);
}

/* CSS click login*/
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 1s ease-out;
}
/* sang trai */
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(150%);
}
</style>
