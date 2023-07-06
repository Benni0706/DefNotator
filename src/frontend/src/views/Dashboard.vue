<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import datasetElement from '../components/datasetElement.vue';

const datasets = ref<JSON>();

async function getDatasets() {
  try {
    const api_url = import.meta.env.VITE_API_URL + '/users/datasets';
    let data = await fetch(api_url, {
      method: "GET",
      credentials: "include"
    });
    if (data.ok) {
      datasets.value = await data.json();
    }
  }
  catch (err: any) {
    console.log(err);
  }
}

getDatasets();
</script>

<template>
  <main class="m-4">
    <h1 class="text-lg">Your datasets:</h1>
    <div class="flex flex-row flex-wrap">
      <datasetElement v-for="dataset in datasets" :data="dataset" />
    </div>
  </main>
</template>
