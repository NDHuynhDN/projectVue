<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal fade" @click.self="onCloseModal">
    <div class="modal-dialog">
      <div class="modal-content bg-signup">
        <div class="modal-header">
          <div class="">
            <button
              @click="onCloseModal"
              class="float-end rounded-second bg-login px-2 text-[#fff]"
            >
              X
            </button>
          </div>
        </div>
        <div class="modal-body">
          <h2 class="text-center font-bold text-[36px] mb-2">{{ props.title }}</h2>
          <slot name="body"></slot>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue'

const props = defineProps<{
  title: string
  // content: string
}>()

const emit = defineEmits<{
  (event: 'cancel'): void
}>()

const onCloseModal = () => {
  emit('cancel')
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  display: block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.14);
}
.fade {
  transition: opacity 0.15s linear;
}

.modal-dialog {
  max-width: 1100px;
  margin: 4.75rem auto;
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}
.modal-dialog {
  position: relative;
  width: auto;
  /* margin: 0.5rem; */
  pointer-events: none;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  outline: 0;
}
.modal-header {
  /* display: flex; */
  /* flex-shrink: 0; */
  /* align-items: center; */
  /* justify-content: space-between; */
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}
.modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}
</style>
