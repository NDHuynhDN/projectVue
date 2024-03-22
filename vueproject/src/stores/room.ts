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
  const totalRoomUse = computed(() => {
    return rooms.value.filter((r) => r.status == 1).length
  })
  const totalRoomEmpty = computed(() => {
    return rooms.value.filter((r) => r.status == 2).length
  })
  const totalRoomRepair = computed(() => {
    return rooms.value.filter((r) => r.status == 3).length
  })

  const addRoom = async (dataRoom: Room): Promise<Room | undefined> => {
    try {
      const res = await axios.post('http://localhost:3000/rooms', dataRoom)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateRoom = async (roomId: number, updateRoomData: Partial<Room>) => {
    try {
      const res = await axios.put(`http://localhost:3000/rooms/${roomId}`, updateRoomData)
      // Cập nhật trạng thái của phòng trong store
      const roomIndex = rooms.value.findIndex((room) => room.id === roomId)
      if (roomIndex !== -1) {
        rooms.value[roomIndex] = res.data
      }
    } catch (error) {
      console.error('Error updating room:', error)
      throw error
    }
  }

  const updateRoomAddUser = async (
    roomId: number | string | undefined,
    updateRoomData: Partial<Room>
  ) => {
    try {
      const res = await axios.put(`http://localhost:3000/rooms/${roomId}`, updateRoomData)
      // Cập nhật trạng thái của phòng trong store
      const roomIndex = rooms.value.findIndex((room) => room.id === roomId)
      if (roomIndex !== -1) {
        rooms.value[roomIndex] = res.data
      }
    } catch (error) {
      console.error('Error updating room:', error)
      throw error
    }
  }

  return {
    fetchRoom,
    fetchRoomById,
    rooms,
    room,
    updateRoom,
    addRoom,
    totalRooms,
    totalRoomUse,
    totalRoomEmpty,
    totalRoomRepair,
    updateRoomAddUser
  }
})
