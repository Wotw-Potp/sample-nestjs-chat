<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import type { Chat } from "../../@types/chat"
import InputArea from "../../components/InputArea.vue"
import OverlayDialog from "../../components/OverlayDialog.vue"
import { WSAdapter } from "../../libs/ws-adapter"
import { useLayoutStateStore } from "../../store/layout-state"
import { useRoomStore } from "../../store/room"
import { useUserStore } from "../../store/user"

const room = useRoomStore(),
  user = useUserStore(),
  layoutState = useLayoutStateStore()

const sendMessageData = ref<Chat>({
    message: "",
    sender: user.$state,
    roomId: room.id,
    postedAt: "",
  }),
  chatMessages = ref<Chat[]>([])

const socket = new WSAdapter(false)

onMounted(() => {
  if (!room.isVerified()) {
    location.href = "/"
  }
  socket.connect()
  socket.recieve(`emitMessage-Room_${room.id}`, (args: Chat) => {
    chatMessages.value.push(args)
  })
})

onBeforeUnmount(() => socket.disconnect())

async function sendMessage(event: Event) {
  event.preventDefault()
  sendMessageData.value.postedAt = new Date().toString()
  await socket.emit("sendMessage", sendMessageData.value).then(() => {
    resetSendMessageData()
  })
}

function resetSendMessageData() {
  sendMessageData.value.message = ""
}

function isMyMesseage(uid: string): boolean {
  return uid === user.uid
}

function isContinuousMessage(n: number, uid: string): boolean {
  if (n < 1) return false
  return chatMessages.value[n - 1].sender.uid === uid
}

function translateDatetime(dateStr: string) {
  const date = new Date(dateStr)
  return `${date.getHours()}:${date.getMinutes()}`
}

function selectFullText(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) return
  event.target.select()
}
</script>

<template>
  <div class="flex flex-col h-[60vh]">
    <header
      class="pb-4 mb-8 px-3 border-b border-slate-700 flex justify-between gap-6 items-end"
    >
      <h2 class="text-xl font-bold tracking-wide">{{ room.name }}</h2>
      <div>
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-3 text-sm text-white font-bold bg-cyan-600 rounded hover:bg-opacity-90"
          @click.stop="layoutState.toggle('dialogOpen')"
        >
          <span>Invite</span
          ><span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </span>
        </button>
      </div>
    </header>
    <main class="grow overflow-y-scroll overscroll-contain">
      <ul v-if="chatMessages && chatMessages.length" class="space-y-5">
        <li
          v-for="(chatMessage, n) in chatMessages"
          :key="n"
          class="flex flex-col w-4/5"
          :class="
            isMyMesseage(chatMessage.sender.uid)
              ? 'items-end ml-auto'
              : 'items-start'
          "
        >
          <div
            v-if="!isContinuousMessage(n, chatMessage.sender.uid)"
            class="pb-2 text-xs text-slate-600 font-bold"
          >
            {{ chatMessage.sender.name }}
          </div>
          <div
            class="whitespace-pre-wrap break-all p-3 rounded-md text-sm"
            :class="
              isMyMesseage(chatMessage.sender.uid)
                ? 'bg-green-500'
                : 'bg-slate-300'
            "
          >
            {{ chatMessage.message }}
          </div>
          <div class="text-xs text-slate-400 leading-relaxed">
            <time :datetime="chatMessage.postedAt">{{
              translateDatetime(chatMessage.postedAt)
            }}</time>
          </div>
        </li>
      </ul>
    </main>
    <footer class="mt-8">
      <form class="flex items-end gap-2" @submit.prevent="sendMessage">
        <InputArea
          v-model="sendMessageData.message"
          placeholder="enter message"
          rows="4"
          maxlength="300"
          required
          class="w-full resize-none"
        />
        <div class="shrink-0">
          <button
            type="submit"
            class="text-white bg-blue-600 w-12 h-12 flex items-center justify-center rounded-sm hover:bg-opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </footer>
    <OverlayDialog
      :is-open="layoutState.dialogOpen"
      @close="layoutState.toggle('dialogOpen')"
    >
      <div>
        <h2 class="text-xl font-bold mb-2">Invite User</h2>
        <hr />
        <div class="mt-2">
          <legend class="text-lg font-bold mb-1">Room Id</legend>
          <input
            class="block p-3 text-sm bg-stone-200 rounded-sm min-w-[25rem]"
            type="text"
            :value="room.id"
            readonly
            @focus="selectFullText"
          />
        </div>
      </div>
    </OverlayDialog>
  </div>
</template>
