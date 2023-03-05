<script setup lang="ts">
defineProps<{
  name?: string
  id?: string
  modelValue: string
  cols?: string | number
  rows?: string | number
  maxlength?: string | number
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

function updateEmittion(event: Event) {
  if (!(event.target instanceof HTMLTextAreaElement)) return
  emit("update:modelValue", event.target.value)
}
</script>

<template>
  <textarea
    :name="name"
    :id="id"
    :cols="cols"
    :rows="rows"
    :value="modelValue"
    :placeholder="placeholder"
    :maxlength="maxlength"
    @input="updateEmittion"
    :required="required"
    class="border-2 border-slate-400 rounded p-2 ring-0 ring-blue-200 focus:ring-2 focus:outline-none"
  />
</template>
