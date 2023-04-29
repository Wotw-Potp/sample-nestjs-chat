import { defineStore } from "pinia"
import { TRoom } from "../@types/room"

export const useRoomStore = defineStore("room", {
  state: (): TRoom => {
    return {
      id: "",
      name: "",
      messages: [],
    }
  },
  actions: {
    isVerified(): boolean {
      return this.id !== "" && this.name !== ""
    },
    setter(room: TRoom) {
      this.$patch(room)
    },
  },
})
