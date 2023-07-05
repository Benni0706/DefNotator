<script setup lang="ts">
const props = defineProps(['data'])
</script>

<template>
  <div class="rounded-xl bg-gray-300 m-1 border-slate-500 border-2 ">
    <h2>{{ props.data.dataset.name }}</h2>
    <span>Your role: {{ props.data.role }}</span>
  </div>
</template>
