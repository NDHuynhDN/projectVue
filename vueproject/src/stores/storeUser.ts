import type { User } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useApiUserStore = defineStore('apiUser', () => {
  const fetchDataUser = async (): Promise<any> => {
    try {
      const response = await axios.get('http://localhost:3000/users')
      return response
    } catch (error) {
      window.alert('Error fetching data')
    }
  }

  const userData = ref<User[]>([])
  const fetchDataUser2 = async (): Promise<any> => {
    try {
      const response = await axios.get('http://localhost:3000/users')
      if (response) {
        userData.value = response.data
      }
    } catch (error) {
      console.log('Error')
    }
  }
  const totalUsers = computed(() => {
    return userData.value.length
  })

  const delDataUser = async (userId: number | string): Promise<User | undefined> => {
    try {
      const res = await axios.delete(`http://localhost:3000/users/${userId}`)
      return res.data
    } catch (error) {
      console.log('Error', error)
    }
  }

  const getUserById = async (id: number | string | string[]): Promise<User | undefined> => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`)
      return res.data
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }
  const addUser = async (formData: User): Promise<User | undefined> => {
    try {
      const res = await axios.post('http://localhost:3000/users', formData)
      return res.data
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }

  return {
    fetchDataUser,
    fetchDataUser2,
    getUserById,
    delDataUser,
    addUser,
    userData,
    totalUsers
  }
})
