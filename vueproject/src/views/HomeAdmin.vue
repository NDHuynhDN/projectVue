<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header></Header>
    <div class="flex mx-2 mt-3">
      <VerticalNav class="mr-1 shadow-2xl"></VerticalNav>
      <div class="flex-1 shadow-2xl ml-1 p-2 w-full rounded-primary">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue'
import VerticalNav from '../components/VerticalNav.vue'
// import usePageTitle from '../router/usePageTitle'
// usePageTitle()
</script>
<style></style>
../components/router/usePageTitle
