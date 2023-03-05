import { defineStore } from "pinia"

interface LayoutState {
  dialogOpen: boolean
}

export const useLayoutStateStore = defineStore("state", {
  state: (): LayoutState => {
    return {
      dialogOpen: false,
    }
  },
  actions: {
    toggle(k: keyof LayoutState) {
      this.$state[k] = !this.$state[k]
    },
  },
})
