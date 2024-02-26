import { defineStore } from 'pinia'
import axios from 'axios'
import type { Room } from '@/types'
import { ref } from 'vue'

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

  const updateRoomStatus = (roomId: number | undefined, newStatus: number): void => {
    const roomIndex = rooms.value.findIndex((room) => room.id === roomId)
    if (roomIndex !== -1) {
      rooms.value[roomIndex].status = newStatus
      
    }
  }
  const updateRoom = (updatedRoom: Room): void => {
    const roomIndex = rooms.value.findIndex((room) => room.id === updatedRoom.id);
    if (roomIndex !== -1) {
      rooms.value[roomIndex] = { ...updatedRoom };
    }
  };

  const room = ref<Room[]>([])
  const fetchRoomById = async (id: number | string | string[] | undefined): Promise<any> => {
    try {
      const res = await axios.get(`http://localhost:3000/rooms/${id}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return { fetchRoom, fetchRoomById, rooms, room, updateRoomStatus, updateRoom }
})
