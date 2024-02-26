<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form class="flex flex-col" @submit.prevent="saveAll(infor)">
    <label class="font-bold" for="">Name: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.name" />
    <label class="font-bold" for="">Username: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.username" />
    <label class="font-bold" for="">Gender: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.gender" />
    <label class="font-bold" for="">Address: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.address" />
    <label class="font-bold" for="">Identify: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.identify" />
    <label class="font-bold" for="">Phone: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.phone" />
    <label class="font-bold" for="">Room_id: </label>
    <input type="text" class="border-b-2 border-whitereal" v-model="infor.room_id" />
  </form>
</template>
<style></style>
<script lang="ts">
import type { User } from '@/types'
import { ref, watch } from 'vue'

export default {
  props: ['infor'],
  setup(props: { infor: User }, { emit }) {
    const tempData = ref<User>({ ...props.infor })

    // Watch for changes in 'infor' prop and update 'tempData' accordingly
    watch(
      () => props.infor,
      () => {
        tempData.value = { ...props.infor }
      }
    )

    const saveAll = (formData: User) => {
      emit('saveInfoEdit', formData)
    }

    return {
      tempData,
      saveAll
    }
  }
}
// defineProps<{ infor: User }>()
</script>
