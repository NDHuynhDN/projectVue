<template>
  <div
    class="w-[1000px] h-[650px] shadow-2xl mx-auto mt-[100px] xl:flex flex-row-reverse rounded-primary bg-main"
  >
    <div class="h-full flex-1">
      <img src="../assets/image/q.jpg" class="h-full w-full rounded-primary shadow-md" alt="" />
    </div>
    <div class="flex-1">
      <div class="my-5 mx-3">
        <h1 class="font-extrabold text-[60px] text-[#6cb3c0] mb-1">Create Account</h1>

        <form @submit.prevent="createAccount()" class="flex flex-col gap-3">
          <div class="rounded-primary shadow-xl p-3 w-full flex items-center gap-[12px] text-white">
            <img src="../assets/image/person-fill.svg" class="w-[25px] h-[25px]" alt="" />
            <input type="text" placeholder="UserName . . ." v-model="accountCreat.username" />
          </div>
          <p class="text-red ml-3" v-if="emptyError">Please enter input</p>
          <!-- <br /> -->
          <div class="rounded-primary shadow-xl p-3 w-full flex items-center gap-[6px] text-white">
            <img src="../assets/image/key-fill.svg" class="w-[30px] h-[30px]" alt="" />
            <input
              :type="showPassword ? 'password' : 'text'"
              placeholder="Password . . ."
              v-model="accountCreat.password"
            />
            <a class="ml-auto cursor-pointer" @click="show()">{{
              showPassword ? 'Show' : 'Hidden'
            }}</a>
          </div>
          <p class="text-red ml-3 mt-0" v-if="emptyError">Please enter input</p>

          <div class="rounded-primary shadow-xl p-3 w-full flex items-center gap-[6px] text-white">
            <img src="../assets/image/key-fill.svg" class="w-[30px] h-[30px]" alt="" />
            <input
              :type="showPassword ? 'password' : 'text'"
              placeholder="Confirm Password . . ."
              v-model="password_confirm"
            />
            <a class="ml-auto cursor-pointer text-whitereal" @click="show()">{{
              showPassword ? 'Show' : 'Hidden'
            }}</a>
          </div>
          <p class="text-red ml-3" v-if="emptyError">Please enter input</p>
          <p v-if="passwordError" class="text-red ml-3">Confirm password is incorrect</p>
          <button
            class="bg-header font-bold rounded-primary w-full px-3 py-2 text-white hover:text-main hover:bg-sub"
            type="submit"
          >
            Sign up
          </button>
        </form>

        <div class="text-center mt-3">
          <span class="text-white"> Have an account ! </span>
          <RouterLink to="/" class="text-signup inline-block font-bold tracking-wide hover:scale-105 hover:ease-in"
            >Login</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { AccountSignUp } from '@/types'
import { useAuthStore } from '@/stores/auth'

const useApiUser = useAuthStore()
const password_confirm = ref<string>('')
const emptyError = ref<boolean>(false)
const passwordError = ref<boolean>(false)

// show password
const showPassword = ref<boolean>(true)
const show = () => {
  showPassword.value = !showPassword.value
}

// binding data
const accountCreat = ref<AccountSignUp>({
  username: '',
  password: '',
  password_confirm: ''
})

// validate input
const validateInput = () => {
  if (accountCreat.value.username == '') {
    emptyError.value = true
  } else {
    emptyError.value = false
  }
  // check confirm password
  watch(password_confirm, (newValue) => {
    if (newValue !== accountCreat.value.password) {
      passwordError.value = true
    } else {
      passwordError.value = false
    }
  })
}
// create account
const createAccount = () => {
  try {
    validateInput()
    if (accountCreat.value.username !== '' && accountCreat.value.password !== '') {
      useApiUser.createAccount(accountCreat.value)
      alert('Create successfully!!!')
    } else {
      window.alert('Form has error!!')
    }
  } catch (error) {
    console.log(error)
  }
  accountCreat.value.username = ''
  accountCreat.value.password = ''
  accountCreat.value.password_confirm = ''
}
</script>

<style scoped>
input::placeholder {
  @apply text-header;
}
</style>
