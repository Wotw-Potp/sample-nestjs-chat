<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(["close"])
</script>

<template>
  <div
    class="fixed z-50 inset-0 bg-slate-700 bg-opacity-70 flex items-center justify-center"
    v-if="isOpen"
    @click.self="emit('close')"
  >
    <div class="bg-white p-6 rounded-md max-w-2xl relative">
      <div class="absolute right-6 top-6">
        <button type="button" @click.stop="emit('close')" class="text-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="pt-7">
        <slot />
      </div>
    </div>
  </div>
</template>
