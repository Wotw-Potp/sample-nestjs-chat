<script setup lang="ts">
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

const data = await fetch(`${API_BASE_URL}/api/user`).then(
  async (res) => await res.json()
)
console.log(data)
</script>

<template>
  <div>hello world</div>
</template>
