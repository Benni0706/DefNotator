<script setup lang="ts">
import { ref } from 'vue';
import datasetElement from '../components/DatasetElement.vue';
import NavBar from '../components/NavBar.vue';
import axios, { HttpStatusCode } from 'axios';

const datasets = ref<JSON>();
const error = ref<String>(" ");

let datasetName: string = "";

async function updateDatasets() {
  const response = await axios.get("/users/datasets");
  datasets.value = response.data;
}

async function addDataset() {
  const response = await axios.post("/datasets/add", { name: datasetName }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
    await updateDatasets();
  } else if (response.status == HttpStatusCode.BadRequest) {
    error.value = "Please pick another name."
  }
}

await updateDatasets();
</script>

<template>
  <main>
    <NavBar view="Dashboard" />
    <div class="bg-slate-400 rounded-xl mt-4 p-2">
      <div class="flex ms-1">
        <h2 class="text-xl font-bold">Your Datasets:</h2>
        <span class="ml-auto bg-gray-300 rounded-xl p-1 hover:bg-gray-200 group">
          <div class="peer hidden group-hover:inline-block [&:not(:has(:placeholder-shown))]:inline-block">
            <span class="text-red-700"> {{ error }}</span>
            <input v-model="datasetName" type="text" placeholder="Dataset Name" class="w-40 ml-auto rounded-xl px-1 text-xl mr-2">
            <button @click="addDataset" class=" text-xl bg-green-500 px-2 rounded-xl hover:bg-green-400">confirm</button>
          </div>
          <div class="inline-block group-hover:hidden peer-[:not(:has(:placeholder-shown))]:hidden">
            <button class="text-xl px-1">add dataset</button>
          </div>
        </span>
      </div>
      <div class="flex flex-row flex-wrap">
        <datasetElement v-for="dataset in datasets" :data="dataset" />
      </div>
    </div>
  </main>
</template>
