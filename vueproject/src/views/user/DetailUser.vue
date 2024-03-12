<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="modal fade" @click.self="onClose()">
    <div class="modal-dialog">
      <div class="modal-content bg-login">
        <div class="flex flex-col ml-2 mr-2">
          <div class="">
            <p class="font-bold text-center mt-2">Information about user {{ props.user.id }}</p>
            <form class="flex flex-col">
              <label class="font-bold" for="">Name: </label>
              <input type="text" class="border-b-2 border-whitereal" v-model="props.user.name" />
              <label class="font-bold" for="">Username: </label>
              <input
                type="text"
                class="border-b-2 border-whitereal"
                v-model="props.user.username"
              />
              <label class="font-bold" for="">Gender: </label>
              <input type="text" class="border-b-2 border-whitereal" v-model="props.user.gender" />
              <label class="font-bold" for="">Address: </label>
              <input type="text" class="border-b-2 border-whitereal" v-model="props.user.address" />
              <label class="font-bold" for="">Identify: </label>
              <input
                type="text"
                class="border-b-2 border-whitereal"
                v-model="props.user.identify"
              />
              <label class="font-bold" for="">Phone: </label>
              <input type="text" class="border-b-2 border-whitereal" v-model="props.user.phone" />
              <label class="font-bold" for="">Room_id: </label>
              <input type="text" class="border-b-2 border-whitereal" v-model="props.user.room_id" />
            </form>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="bg-red m-2 p-2 rounded-second" @click="onClose()">Cancel</button>
          <button class="bg-signup m-2 p-2 rounded-second" @click="saveAll(user)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
<script lang="ts" setup>
// import FormUser from '@/views/user/FormUser.vue'
import type { User } from '@/types'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'save', payload: User): void
}>()

const saveAll = (formData: User) => {
  emit('save', formData)
}

const onClose = () => {
  emit('cancel')
}
</script>
<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
