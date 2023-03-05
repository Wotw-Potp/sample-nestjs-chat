<script setup lang="ts">
import { ref } from "vue"
import { ErrorResponseType } from "../../@types/error-message"
import { Room } from "../../@types/room"
import ErrorMessages from "../../components/ErrorMessages.vue"
import InputField from "../../components/InputField.vue"
import ProgressButton from "../../components/ProgressButton.vue"
import { API_BASE_URL } from "../../libs/const"
import { useRoomStore } from "../../store/room"

interface CreateRoomParams {
  name: Room["name"]
}

const formData = ref<CreateRoomParams>({
    name: "",
  }),
  isLoading = ref<boolean>(false),
  errorMsgs = ref<string[]>([])

const room = useRoomStore()

async function submit(event: Event) {
  event.preventDefault()
  if (!formData.value.name) return
  isLoading.value = !isLoading.value

  await fetch(`${API_BASE_URL}/api/room/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  })
    .then(async (res) => {
      if (!res.ok) {
        const err: ErrorResponseType = await res.json()
        errorMsgs.value.push(...err.message)
      } else {
        const data: Room = await res.json()
        room.setter(data)
        location.hash = "#room-entered"
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = !isLoading.value
    })
}
</script>

<template>
  <div>
    <h2 class="text-lg font-bold mb-2">New Chat Room</h2>
    <ErrorMessages :errors="errorMsgs" />
    <form class="space-y-8" @submit.prevent="submit">
      <div class="flex justify-center">
        <InputField
          type="text"
          v-model="formData.name"
          minlength="5"
          maxlength="20"
          placeholder="enter room name"
          class="w-2/3"
        />
      </div>
      <div class="flex justify-center">
        <ProgressButton type="submit" :is-loading="isLoading">
          Enter
        </ProgressButton>
      </div>
    </form>
  </div>
</template>
