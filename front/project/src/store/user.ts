import { defineStore } from "pinia"
import { User } from "../@types/user"

export const useUserStore = defineStore("user", {
  state: (): User => {
    return {
      uid: "",
      name: ""
    }
  },
  actions: {
    registered() {
      return this.uid !== ""
    },
    setter(user: User) {
      this.$patch(user)
    },
  },
})
