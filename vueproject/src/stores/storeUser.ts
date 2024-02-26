// import { WindowsFilled } from '@ant-design/icons'
// import type { ApiData, ApiState } from '@/types'
import type { User } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApiUserStore = defineStore('apiUser', () => {
  const fetchDataUser = async (): Promise<any> => {
    try {
      const response = await axios.get('http://localhost:3000/users')
      return response
      // userData.value = response.data
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

  const delDataUser = async (userId: number): Promise<any> => {
    try {
      const res = await axios.delete(`http://localhost:3000/users/${userId}`)
      return res.data
    } catch (error) {
      console.log('Error', error)
    }
  }
  const getUserById = async (id: number | string | string[]): Promise<void> => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`)
      return res.data
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }
  const addUser = async (formData: User): Promise<void> => {
    try {
      const res = await axios.post('http://localhost:3000/users', formData)
      return res.data
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }
  return {
    // status,
    fetchDataUser,
    fetchDataUser2,
    getUserById,
    delDataUser,
    addUser,
    userData
  }
})
