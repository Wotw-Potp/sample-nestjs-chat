<script setup lang="ts">
defineProps<{
  type: "submit" | "reset" | "button"
  isLoading: boolean
}>()

const emit = defineEmits(["click"])
</script>

<template>
  <button
    :type="type"
    class="px-6 py-3 rounded text-white font-bold bg-blue-600 hover:bg-opacity-80"
    :class="{ 'cursor-progress bg-slate-700 hover:bg-opacity-100': isLoading }"
    @click="emit('click')"
    :disabled="isLoading"
  >
    <slot />
  </button>
</template>
