import { TUser } from "./user"

export type TMessage = {
  id: number
  content: string
  createdAt: string
  sender: TUser
}
