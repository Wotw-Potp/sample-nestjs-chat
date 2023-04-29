<script setup lang="ts">
import {  ref } from "vue"
import { ErrorResponseType } from "../@types/error-message"
import type { TUser } from "../@types/user"
import ErrorMessages from "../components/ErrorMessages.vue"
import InputField from "../components/InputField.vue"
import ProgressButton from "../components/ProgressButton.vue"
import { API_BASE_URL } from "../libs/const"
import { useUserStore } from "../store/user"

interface UserRegisterResponse {
  uid: TUser["uid"]
  name: TUser["name"]
}

const formData = ref({
    name: "",
  }),
  isLoading = ref<boolean>(false),
  errorMsgs = ref<string[]>([]),
  user = useUserStore()

async function submit() {
  if (!formData.value.name) return
  if (errorMsgs.value.length) errorMsgs.value = []
  isLoading.value = !isLoading.value

  await fetch(`${API_BASE_URL}/api/user/register`, {
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
        const data: UserRegisterResponse = await res.json()
        user.setter(data)

        location.hash = "#entrance"
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
    <ErrorMessages :errors="errorMsgs" />
    <div class="space-y-8">
      <div class="flex justify-center">
        <InputField
          type="text"
          v-model="formData.name"
          minlength="3"
          maxlength="20"
          placeholder="enter your name"
          class="w-2/3"
        />
      </div>
      <div class="flex justify-center">
        <ProgressButton type="button" :is-loading="isLoading" @click="submit">
          Register
        </ProgressButton>
      </div>
    </div>
  </div>
</template>
