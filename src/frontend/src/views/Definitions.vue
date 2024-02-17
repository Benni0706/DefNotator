<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import ListElement from '../components/ListElement.vue';
import { useRoute } from "vue-router";
import axios, { HttpStatusCode } from 'axios';
import type { CurrentUser } from '@/types/provided';

const props = defineProps<{
  user: CurrentUser,
}>();
const route = useRoute();

const datasetDefinitions = ref();
const allDefinitions = ref();
const tab = ref<number>(0);
const selectedDefinition = ref()

const datasetName: string = route.params.datasetName.toString();

const response = await axios.get(`/datasets/${encodeURIComponent(datasetName)}`, { validateStatus: null });

let definitionContent: string = "";

async function getDatasetDefinitions() {
  const response = await axios.get(`/datasets/${encodeURIComponent(datasetName)}/definitions`);
  datasetDefinitions.value = response.data;
}

async function getAllDefinitions() {
  const response = await axios.get("/definitions/all");
  allDefinitions.value = response.data;
}

async function addNewDefinition() {
  const response = await axios.post("/definitions/add", { content: definitionContent }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
    console.log(response.data)
    const response_assign = await axios.post("/definitions/assign", { definitionId: response.data.id, datasetName: datasetName }, { validateStatus: null });
    if (response_assign.status == HttpStatusCode.Ok) {
      await Promise.all([
        getDatasetDefinitions(),
        getAllDefinitions(),
      ])
    }
  }
}

async function assignDefinition() {
  const response = await axios.post("/definitions/assign", { definitionId: selectedDefinition.value.id, datasetName: datasetName }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
    await Promise.all([
      getDatasetDefinitions(),
      getAllDefinitions(),
    ])
  }
}

async function unassignDefinition(id: Number) {
  const response = await axios.post("/definitions/unassign", { definitionId: id, datasetName: datasetName }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
    await Promise.all([
      getDatasetDefinitions(),
      getAllDefinitions(),
    ])
  }
}

if (response.status == 200) {
  await Promise.all([
    getDatasetDefinitions(),
    getAllDefinitions(),
  ])
}
</script>

<template>
  <div v-if="response.status != 200">
    <NavBar view="Dataset not found" :user="props.user" />
    <p>Dataset not found</p>
  </div>
  <div v-else>
    <NavBar :view="`${datasetName} - definitions overview`" :user="props.user" />
    <div class="flex mt-2">
      <div class=" bg-slate-400 rounded-xl m-2 p-2 w-8/12">
        <h1 class="font-bold">Definitions assigned to this dataset:</h1>
        <ListElement @remove="unassignDefinition(definition.id)" v-for="definition in datasetDefinitions" :data="definition" />
      </div>
      <div class="bg-slate-400 rounded-xl m-2 p-2 w-1/3">
        <div class="flex m-1">
          <button @click="tab=0" :class="{ 'bg-slate-300': tab == 0}" class="text-nowrap bg-slate-200 p-2 mr-1 rounded-tl-lg hover:bg-slate-300">Add new definition</button>
          <button @click="tab=1" :class="{ 'bg-slate-300': tab == 1}" class="text-nowrap bg-slate-200 p-2 rounded-tr-lg hover:bg-slate-300">Add existing definition</button>
        </div>
        <div v-if="tab==0" class="w-full max-w-full">
          <textarea v-model="definitionContent" placeholder="definition content" class="w-full rounded-xl text-xl h-48 p-1"></textarea>
          <button @click="addNewDefinition" class="text-xl bg-green-500 rounded-xl hover:bg-green-400 text-center w-full">Add</button>
        </div>
        <div v-if="tab==1" class="w-full max-w-full">
          <select v-model="selectedDefinition" class="w-full max-w-full rounded-lg">
            <option value="" disabled>Select definition</option>
            <option v-for="definition in allDefinitions" :value="definition" class="overflow-auto ">
              {{ definition.content }}
            </option>
          </select>
          <button @click="assignDefinition" class="text-xl bg-green-500 rounded-xl hover:bg-green-400 text-center w-full mt-1">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
