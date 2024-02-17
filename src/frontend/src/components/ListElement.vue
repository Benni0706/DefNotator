<script setup lang="ts">
const props = defineProps(['data']);
</script>

<template>
  <div class="flex justify-between rounded-xl bg-gray-300 m-1 p-2 max-w-full group hover:bg-gray-200">
    <p class="text-sm overflow-hidden h-5 line-clamp-1 group-hover:h-fit group-hover:line-clamp-none">{{ props.data.content }}</p>
    <button @click="$emit('remove')" class="bg-red-400 rounded-lg hover:bg-red-500 px-1">Remove</button>
  </div>
</template>