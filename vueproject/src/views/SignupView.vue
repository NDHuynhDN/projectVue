<template>
  <div
    class="w-[1000px] h-[550px] shadow-2xl mx-auto mt-[100px] xl:flex flex-row-reverse rounded-primary bg-white"
  >
    <div class="h-full flex-1">
      <img src="../assets/image/q.jpg" class="h-full w-full rounded-primary shadow-md" alt="" />
    </div>
    <div class="flex-1">
      <div class="my-5 mx-3">
        <h1 class="font-extrabold text-[60px] text-[#a4dbe6] mb-3">Create Account</h1>

        <form @submit.prevent="createAccount()">
          <div class="bg-input rounded-primary p-3 w-full flex items-center gap-[12px]">
            <img src="../assets/image/person-fill.svg" class="w-[25px] h-[25px]" alt="" />
            <input type="text" placeholder="UserName . . ." v-model="accountCreat.username" />
          </div>
          <p class="text-red ml-3" v-if="emptyError">Please enter input</p>
          <!-- <br /> -->
          <div class="bg-input rounded-primary p-3 w-full flex items-center gap-[6px]">
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
          <p class="text-red ml-3" v-if="emptyError">Please enter input</p>

          <div class="bg-input rounded-primary p-3 w-full flex items-center gap-[6px]">
            <img src="../assets/image/key-fill.svg" class="w-[30px] h-[30px]" alt="" />
            <input
              :type="showPassword ? 'password' : 'text'"
              placeholder="Confirm Password . . ."
              v-model="password_confirm"
            />
            <a class="ml-auto cursor-pointer" @click="show()">{{
              showPassword ? 'Show' : 'Hidden'
            }}</a>
          </div>
          <p class="text-red ml-3" v-if="emptyError">Please enter input</p>
          <p v-if="passwordError" class="text-red ml-3">Confirm password is incorrect</p>
          <button class="btn-2 rounded-primary w-full" type="submit">Sign up</button>
        </form>

        <p class="text-center mt-3">
          Have an account ! <RouterLink to="/" class="text-signup">Login</RouterLink>
        </p>
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

//
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

<style></style>
