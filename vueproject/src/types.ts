export interface Room {
  id: number | string | undefined
  name: string
  count: number
  status: number
}
export interface User {
  id: number
  name: string
  username: string
  identify: string
  address: string
  phone: string
  gender: string
  room_id?: number 
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
