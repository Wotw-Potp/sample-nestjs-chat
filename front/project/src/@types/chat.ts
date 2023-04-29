import { TRoom } from "./room"
import { TUser } from "./user"

export type TChat = {
  message: string
  roomId: TRoom["id"]
  sender: TUser
  postedAt: string
}
