import {User} from './User'

export interface Reservation{
  id: number
  status: string
  description?: string
  apps: Array<string>
  user: User
  created: Date
  updated: Date
}
