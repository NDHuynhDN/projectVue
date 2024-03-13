import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import type { AccountLogin, AccountSignUp } from '@/types'

export const useAuthStore = defineStore('user', () => {
  const accountUser = ref<AccountLogin[]>([])
  const fetchAccountUser = async (username: string, password: string): Promise<any> => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users?username=${username}&password=${password}`
      )
      accountUser.value = res.data
    } catch (error) {
      console.log(error)
    }
  }

  const createAccount = async (account: AccountSignUp): Promise<AccountSignUp | undefined> => {
    try {
      const res = await axios.post('http://localhost:3000/users', account)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    accountUser,
    fetchAccountUser,
    createAccount
  }
})
