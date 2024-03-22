export interface Room {
  id: number
  maxCapacity: number
  currentCapacity: number
  status: number
}
export interface User {
  id: number | string
  name: string
  username: string
  identify: string
  address: string
  phone: string
  gender: string
  room_id?: number | undefined | string
  password?: string
}
export interface AccountLogin {
  username: string
  password: string
  id?: number
  name?: string
  identify?: string
  address?: string
  phone?: string
  gender?: string
}
export interface AccountSignUp {
  username: string
  password: string
  password_confirm?: string
}
export interface ErrorLogin {
  usernameError: string
  passwordError: string
}
export type RoomStatus = 'hasUser' | 'empty' | 'repair' | 'all' | ''
