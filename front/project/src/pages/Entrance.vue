<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ErrorResponseType } from "../@types/error-message"
import { Room } from "../@types/room"
import { User } from "../@types/user"
import ErrorMessages from "../components/ErrorMessages.vue"
import InputField from "../components/InputField.vue"
import ProgressButton from "../components/ProgressButton.vue"
import { API_BASE_URL } from "../libs/const"
import { useRoomStore } from "../store/room"
import { useUserStore } from "../store/user"

interface EnterRoomParams {
  userId: User["uid"]
  roomId: Room["id"]
}

const user = useUserStore()

const formData = ref<EnterRoomParams>({
    userId: user.uid,
    roomId: "",
  }),
  isLoading = ref<boolean>(false),
  errorMsgs = ref<string[]>([])

const room = useRoomStore()

onMounted(() => {
  if (!user.registered()) {
    location.href = "/"
  }
})

async function submit(event: Event) {
  event.preventDefault()
  if (!formData.value.roomId) return
  isLoading.value = !isLoading.value

  await fetch(`${API_BASE_URL}/api/room/${formData.value.roomId}`)
    .then(async (res) => {
      if (!res.ok) {
        const err: ErrorResponseType = await res.json()
        errorMsgs.value.push(...err.message)
      } else {
        const data: Room = await res.json()
        room.setter(data)
        moveTo("#room-entered")
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = !isLoading.value
    })
}

function moveTo(hash: string) {
  location.hash = hash
}
</script>

<template>
  <div>
    <h2 class="text-xl text-center font-bold">
      Welcome
      <span class="inline-block px-1 bg-gray-100 rounded">{{ user.name }}</span>
      !!
    </h2>
    <div class="mt-10">
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-2">New Chat Room</h3>
        <div class="flex justify-center">
          <ProgressButton
            type="button"
            :is-loading="false"
            class="bg-green-600"
            @click="moveTo('#room-create')"
            >Create</ProgressButton
          >
        </div>
      </div>
      <hr class="pb-6 mt-6 border-slate-600" />
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-bold mb-2">If You Have Room Id</h3>
        <ErrorMessages :errors="errorMsgs" />
        <form class="space-y-4" @submit.prevent="submit">
          <div class="flex justify-center">
            <InputField
              type="text"
              v-model="formData.roomId"
              placeholder="enter room ID"
              required
              class="w-full"
            />
          </div>
          <div class="hidden invisible">
            <InputField
              type="hidden"
              v-model="formData.userId"
              readonly
              disabled
            />
          </div>
          <div class="flex justify-center">
            <ProgressButton type="submit" :is-loading="isLoading"
              >Enter</ProgressButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
