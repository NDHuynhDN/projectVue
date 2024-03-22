<template>
  <div class="w-[1000px] h-[600px] shadow-2xl mx-auto mt-[150px] xl:flex rounded-primary">
    <div class="h-full flex-1">
      <img
        src="../assets/image/imgLogin.jpg"
        class="h-full w-full rounded-primary shadow-md"
        alt=""
      />
    </div>
    <div class="flex-1">
      <div class="my-5 mx-3">
        <h3 class="font-medium text-white text-[30px]">Welcome to</h3>
        <h1 class="font-extrabold text-[60px] text-login mb-3">Our Home</h1>
        <form @submit.prevent="login()">
          <div class="rounded-primary p-3 w-full flex items-center gap-[12px] shadow-xl">
            <img src="../assets/image/person-fill.svg" class="w-[25px] h-[25px]" alt="" />
            <input
              type="text"
              class="text-white"
              placeholder="UserName . . ."
              v-model="usernameInput"
              id="username"
              @input="validateInput(usernameInput, usernameError)"
            />
          </div>
          <p class="text-red ml-3" v-if="usernameError && !usernameInput">
            Please, enter your username
          </p>
          <br />
          <div class="rounded-primary p-3 w-full flex items-center gap-[6px] shadow-xl">
            <img src="../assets/image/key-fill.svg" class="w-[30px] h-[30px]" alt="" />
            <input
              type="password"
              class="text-white"
              placeholder="Password . . ."
              v-model="passwordInput"
              id="password"
              @input="validateInput(passwordInput, passwordError)"
            />
          </div>
          <p class="text-red ml-3" v-if="passwordError && !passwordInput">
            Please, enter your password
          </p>

          <div class="flex justify-between mt-2 text-white">
            <div><input type="checkbox"/> Remember me</div>
            <a href="" class="hover:text-whitereal">Forgot password</a>
          </div>
          <button class="px-3 py-2 rounded-primary mt-3 w-full shadow-xl text-white bg-header hover:bg-sub hover:text-main transition-all font-bold">Log in</button>
        </form>

        <div class="text-center mt-3">
          <span class="text-white"> Don't have account? </span>
          <RouterLink to="/signup" class="text-login inline-block tracking-wide font-bold hover:scale-105 ease-in">Signup</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const useAPIAccount = useAuthStore()

const usernameInput = ref<string>('')
const passwordInput = ref<string>('')

const usernameError = ref<boolean>(false)
const passwordError = ref<boolean>(false)

const validateInput = (input: string, errorVariable: any) => {
  if (!input) {
    errorVariable.value = true
  } else {
    errorVariable.value = false
  }
}

const login = async () => {
  if (!usernameInput.value) {
    usernameError.value = true
  }
  if (!passwordInput.value) {
    passwordError.value = true
  }
  if (usernameInput.value !== '' && passwordInput.value !== '') {
    if (usernameInput.value == 'admin' && passwordInput.value == 'admin') {
      alert('Login succes, Welcome to admin page')
      router.push('/homepage')
    } else {
      await useAPIAccount.fetchAccountUser(usernameInput.value, passwordInput.value)
      if (useAPIAccount.accountUser.length > 0) {
        alert('Login succes, Welcome to user page')
        setTimeout(() => {
          router.push({ name: 'homeuser', params: { username: usernameInput.value } })
        }, 500)
      } else {
        alert('Login fail, check username, password !')
      }
    }
  }
}
</script>

<style scoped>
input[type='checkbox'] {
  filter: sepia(100%) brightness(80%) hue-rotate(150deg) saturate(50%) contrast(200%);
  width: 20px;
  height: 15px;
}
input::placeholder{
  @apply text-header
}
</style>
@/components/router
