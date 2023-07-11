<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps(['data']);
</script>

<template>
  <router-link :to="{ name: 'Dataset', params: { datasetName: props.data.dataset.name}}" class="rounded-xl bg-gray-300 m-1 p-2 w-48 min-w-fit cursor-pointer hover:bg-gray-400">
    <h2 class="font-bold text-center text-xl">{{ props.data.dataset.name }}</h2>
    <p class="text-sm text-center">{{ props.data.role }}</p>
  </router-link>
</template>