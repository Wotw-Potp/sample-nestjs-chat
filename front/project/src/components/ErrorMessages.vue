<script setup lang="ts">
defineProps<{
  errors: string[]
}>()
</script>

<template>
  <div>
    <ul v-if="errors.length" class="space-y-2 py-4">
      <li v-for="(error, n) in errors" :key="n">
        <span class="text-red-600 font-bold text-xs tracking-wider">{{
          error
        }}</span>
      </li>
    </ul>
  </div>
</template>
