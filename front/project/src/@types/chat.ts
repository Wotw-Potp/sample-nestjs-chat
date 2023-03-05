import { Room } from "./room"
import { User } from "./user"

export type Chat = {
  message: string
  roomId: Room["id"]
  sender: User
  postedAt: string
}
