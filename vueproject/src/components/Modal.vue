<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal fade" @click.self="onCloseModal">
    <div class="modal-dialog">
      <div class="modal-content bg-main">
        <div class="modal-header">
          <div class="">
            <button
              @click="onCloseModal"
              class="float-end rounded-second bg-header px-3 py-2 text-whitereal hover:bg-red"
            >
              Close
            </button>
          </div>
        </div>
        <div class="modal-body">
          <h2 class="text-center font-bold text-[40px] text-whitereal mb-2">{{ props.title }}</h2>
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
}
</style>
