import { TMessage } from "./message"

export type TRoom = {
  id: string
  name: string
  messages: TMessage[]
}
