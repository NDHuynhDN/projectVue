<template>
  <div class="w-[1000px] h-[550px] shadow-2xl mx-auto mt-[100px] xl:flex rounded-primary">
    <div class="h-full flex-1">
      <img
        src="../assets/image/imgLogin.jpg"
        class="h-full w-full rounded-primary shadow-md"
        alt=""
      />
    </div>
    <div class="flex-1">
      <div class="my-5 mx-3">
        <h3 class="font-medium">Welcome to</h3>
        <h1 class="font-extrabold text-[60px] text-login mb-3">Our Home</h1>
        <form @submit.prevent="login()">
          <div class="bg-input rounded-primary p-3 w-full flex items-center gap-[12px]">
            <img src="../assets/image/person-fill.svg" class="w-[25px] h-[25px]" alt="" />
            <input type="text" placeholder="UserName . . ." v-model="usernameInput" />
          </div>
          <p class="text-red ml-3" v-if="usernameError">Please, enter your username</p>
          <br />
          <div class="bg-input rounded-primary p-3 w-full flex items-center gap-[6px]">
            <img src="../assets/image/key-fill.svg" class="w-[30px] h-[30px]" alt="" />
            <input type="password" placeholder="Password . . ." v-model="passwordInput" />
          </div>
          <p class="text-red ml-3" v-if="passwordError">Please, enter your password</p>

          <div class="flex justify-between mt-2">
            <div><input type="checkbox" /> Remember me</div>
            <a href="">Forgot password</a>
          </div>
          <button class="btn-1 rounded-primary mt-3 w-full">Log in</button>
        </form>

        <p class="text-center mt-3">
          Don't have account? <RouterLink to="/signup" class="text-login">Signup</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'

const useAPIAccount = useAuthStore()

const usernameInput = ref<string>('')
const passwordInput = ref<string>('')

const usernameError = ref<boolean>(false)
const passwordError = ref<boolean>(false)

const validate = () => {
  if (usernameInput.value === '') {
    usernameError.value = true
  }

  if (passwordInput.value === '') {
    passwordError.value = true
  }

  watch(usernameInput, (newValue) => {
    if (newValue !== '') {
      usernameError.value = false
    } else {
      usernameError.value = true
    }
  })

  watch(passwordInput, (newValue) => {
    if (newValue !== '') {
      passwordError.value = false
    } else {
      passwordError.value = true
    }
  })
}

const login = async () => {
  // Perform validation
  validate()
  if (usernameInput.value !== '' && passwordInput.value !== '') {
    if (usernameInput.value == 'admin' && passwordInput.value == 'admin') {
      alert('Login succes, Welcome to admin page')
      router.push('/home')
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
  filter: sepia(100%) brightness(80%) hue-rotate(170deg) saturate(70%) contrast(300%);
  width: 20px;
  height: 15px;
}
/* .invalid {
  border: 1px solid red;
} */
</style>
