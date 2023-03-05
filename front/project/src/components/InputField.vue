<script setup lang="ts">
defineProps<{
  type: "text" | "tel" | "email" | "password" | "hidden"
  disabled?: boolean
  id?: string
  required?: boolean
  modelValue: string
  maxlength?: string
  minlength?: string
  placeholder?: string
  readonly?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

function updateEmittion(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) return
  emit("update:modelValue", event.target.value)
}
</script>

<template>
  <input
    :type="type"
    :disabled="disabled"
    :id="id"
    :required="required"
    :placeholder="placeholder"
    :value="modelValue"
    :maxlength="maxlength"
    :minlength="minlength"
    :readonly="readonly"
    @input="updateEmittion"
    class="h-10 border-2 border-slate-400 rounded px-2 ring-0 ring-blue-200 focus:ring-2 focus:outline-none"
  />
</template>
