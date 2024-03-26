<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="w-[150px] h-[20px] rounded-primary skeleton"></div>
  </div>
</template>
<style scoped>
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(198, 5%, 48%);
  }
  100% {
    background-color: hsl(200, 17%, 65%);
  }
}
</style>
