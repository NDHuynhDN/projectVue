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
}>()

const emit = defineEmits<{
  (event: 'cancel'): void
}>()

const onCloseModal = () => {
  emit('cancel')
}
</script>

<style scoped>
.modal-header {
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
