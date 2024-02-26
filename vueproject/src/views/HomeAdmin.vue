<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header></Header>
    <div class="flex justify-around">
      <VerticalNav class="w-[25%]"></VerticalNav>
      <div class="w-[70%] flex gap-2 m-2 p-2 shadow-xl rounded-second">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue'
import VerticalNav from '../components/VerticalNav.vue'
</script>
<style></style>
