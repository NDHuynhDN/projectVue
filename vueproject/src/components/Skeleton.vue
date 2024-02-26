<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="w-[150px] h-[20px] rounded-primary skeleton "></div>
  </div>
</template>
<style scoped>
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}</style>
