import { defineStore } from 'pinia'
import axios from 'axios'
import type { Room } from '@/types'
import { computed, reactive, ref, type ComputedRef } from 'vue'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref<Room[]>([])
  const fetchRoom = async (): Promise<void> => {
    try {
      const res = await axios.get('http://localhost:3000/rooms')
      if (res) {
        rooms.value = res.data
      }
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateRoomStatus = (updatedRoom: Room): any => {
    const roomIndex = rooms.value.findIndex((room) => room.id === updatedRoom.id)
    if (roomIndex !== -1) {
      rooms.value[roomIndex] = updatedRoom
    }
  }

  const room = ref<Room[]>([])
  const fetchRoomById = async (id: number | string | string[] | undefined): Promise<any> => {
    try {
      const res = await axios.get(`http://localhost:3000/rooms/${id}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  const totalRooms = computed(() => {
    return rooms.value.length
  })

  const addRoom = async (dataRoom: Room): Promise<Room | undefined> => {
    try {
      const res = await axios.post('http://localhost:3000/rooms', dataRoom)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchRoom,
    fetchRoomById,
    rooms,
    room,
    updateRoomStatus,
    addRoom,
    totalRooms
  }
})
