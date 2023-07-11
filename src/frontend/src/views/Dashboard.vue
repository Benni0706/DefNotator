<script setup lang="ts">
import { ref } from 'vue';
import datasetElement from '../components/datasetElement.vue';
import navBar from '../components/navBar.vue';

const props = defineProps(['user']);

const datasets = ref<JSON>();
const datasetFieldToggle = ref<Boolean>(false);
const error = ref<String>(" ");

let datasetName: string = "";

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

async function addDataset() {
  try {
    const api_url = import.meta.env.VITE_API_URL + '/datasets/add';
    let data = await fetch(api_url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ name: datasetName })
    });
    if (data.ok) {
      getDatasets();
    } else if (data.status == 400) {
      error.value = "Please pick another name."
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
    <div class="bg-slate-400 rounded-xl mt-4 p-2">
      <div class="flex ms-1">
        <h2 class="text-xl font-bold">Your Datasets:</h2>
        <span class="ml-auto bg-gray-300 rounded-xl p-1 hover:bg-gray-200 group">
          <span class="text-red-700 group-hover:inline-block hidden"> {{ error }}</span>
          <input v-model="datasetName" type="text" class="group-hover:inline-block hidden w-40 ml-auto rounded-xl px-1 text-xl mr-2">
          <button @click="addDataset" class="group-hover:inline-block hidden text-xl bg-green-500 px-2 rounded-xl hover:bg-green-400">confirm</button>
          <button class="text-xl px-1 group-hover:hidden">add dataset</button>
        </span>
      </div>
      <div class="flex flex-row flex-wrap">
        <datasetElement v-for="dataset in datasets" :data="dataset" />
      </div>
    </div>
  </main>
</template>