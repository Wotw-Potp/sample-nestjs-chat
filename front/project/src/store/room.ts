import { defineStore } from "pinia"
import { Room } from "../@types/room"

export const useRoomStore = defineStore("room", {
  state: (): Room => {
    return {
      id: "",
      name: "",
    }
  },
  actions: {
    isVerified(): boolean {
      return this.id !== "" && this.name !== ""
    },
    setter(room: Room) {
      this.$patch(room)
    },
  },
})
