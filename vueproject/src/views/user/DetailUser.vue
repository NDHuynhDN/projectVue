<template>
  <div class="ml-5">View information about User : {{ route.params.id }}</div>

  <div
    v-if="inforUser"
    class="bg-login absolute top-[100px] ml-[20px] w-[1100px] rounded-second mx-auto"
  >
    <div class="text-center font-bold text-[40px]">
      View information about User {{ route.params.id }}
    </div>
    <div class="flex flex-col ml-2 mr-2">
      <div class="">
        <FormUser :infor="inforUser" @saveInfoEdit="saveInfo"></FormUser>
      </div>
      <!-- <div class="text-center">
        <div class="border rounded-[100px] w-[100px] h-[100px]"></div>
      </div> -->
    </div>
    <div class="flex justify-end">
      <button class="bg-red m-2 p-2 rounded-second" @click="cancelEdit">Cancel</button>
      <!-- <button v-if="!editing" class="bg-signup m-2 p-2 rounded-second" @click="startEdit">
        Edit
      </button> -->
      <button class="bg-signup m-2 p-2 rounded-second" @click="saveInfo(inforUser)">Save</button>
    </div>
  </div>
</template>
<style></style>
<script lang="ts" setup>
import FormUser from '@/views/user/FormUser.vue'
import type { User } from '@/types'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useApiUserStore } from '@/stores/storeUser'

const route = useRoute()

const router = useRouter()

const useApiUser = useApiUserStore()

const cancelEdit = () => {
  router.push('/user')
}

const inforUser = ref<User>()
watch(
  () => route.params.id,
  async () => {
    // const res = await useApiUser.getUserById(route.params.id)
    const res = await axios.get(`http://localhost:3000/users/${route.params.id}`)
    if (res) {
      inforUser.value = res.data
    }
  }
)

const saveInfo = async (infor: User) => {
  try {
    await axios.put(`http://localhost:3000/users/${route.params.id}`, infor).then(async () => {
      alert('Edit Succesful !!!')
      const res = await axios.get(`http://localhost:3000/users`)
      inforUser.value = res.data
      router.push('/user')
    })

    // inforUser.value = { ...infor }
    // editing.value = false
  } catch (error) {
    alert('Error updating user info')
  }
}
</script>
