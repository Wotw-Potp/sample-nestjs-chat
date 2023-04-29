import { defineStore } from "pinia"
import { TUser } from "../@types/user"

export const useUserStore = defineStore("user", {
  state: (): TUser => {
    return {
      uid: "",
      name: ""
    }
  },
  actions: {
    registered() {
      return this.uid !== ""
    },
    setter(user: TUser) {
      this.$patch(user)
    },
  },
})
