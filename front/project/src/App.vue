<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import DefaultLayout from "./layouts/DefaultLayout.vue"
import Entrance from "./pages/Entrance.vue"
import Home from "./pages/Home.vue"
import RoomCreate from "./pages/rooms/Create.vue"
import RoomEntered from "./pages/rooms/Room.vue"

interface RouteProperty {
  [key: string]: any
}

const routes: RouteProperty = {
  "/": Home,
  entrance: Entrance,
  "room-create": RoomCreate,
  "room-entered": RoomEntered,
}

let currentPath = ref<string>(window.location.hash),
  currentView = computed(() => {
    const key = currentPath.value.replace(/^\/?#/, "") || "/"
    return routes[key]
  })

onMounted(() => {
  window.addEventListener("hashchange", () => {
    currentPath.value = window.location.hash
  })
})
</script>

<template>
  <DefaultLayout>
    <component :is="currentView" />
  </DefaultLayout>
</template>
