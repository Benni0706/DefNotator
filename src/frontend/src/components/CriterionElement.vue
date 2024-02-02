<script setup lang="ts">
const props = defineProps(['data']);
</script>

<template>
  <div class="rounded-xl bg-gray-300 m-1 p-2 max-w-full group hover:bg-gray-200">
    <p class="text-sm overflow-hidden h-5 line-clamp-1 group-hover:h-fit group-hover:line-clamp-none">{{ props.data.content }}</p>
  </div>
</template>