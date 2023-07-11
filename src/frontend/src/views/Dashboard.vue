<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import datasetElement from '../components/datasetElement.vue';
import navBar from '../components/navBar.vue';

const props = defineProps(['user']);

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
    <navBar view="Dashboard" :user="user" />
    <div class="flex flex-row flex-wrap m-3">
      <datasetElement v-for="dataset in datasets" :data="dataset" />
    </div>
  </main>
</template>