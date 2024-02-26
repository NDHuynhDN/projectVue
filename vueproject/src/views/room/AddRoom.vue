<template>
  <form class="flex flex-col gap-3 items-center w-[600px] mx-auto" @submit.prevent="saveInfoAdd">
    <!-- <label for="" class="">Name: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter id . . ."
      v-model="formData.name"
    />
    <!-- <label for="" class="flex-1">Username: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter name . . ."
      v-model="formData.username"
    />
    <!-- <label for="">Gender: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter number . . ."
      v-model="formData.gender"
    />
    <!-- <label for="">Address: </label> -->
    <input
      type="text"
      class="bg-white px-3 shadow-md py-2 rounded-second w-[600px]"
      placeholder="Enter status . . ."
      v-model="formData.address"
    />
    <!-- <label for="">Identify code: </label> -->
    <button class="bg-login m-2 rounded-second px-3 py-2">Add room</button>
  </form>
</template>
<script lang="ts" setup>
import type { User } from '@/types'
import { reactive } from 'vue'

const formData = reactive<User>({
  id: 1,
  name: '',
  username: '',
  identify: '',
  address: '',
  phone: '',
  gender: ''
})

const saveInfoAdd = async () => {}
</script>
