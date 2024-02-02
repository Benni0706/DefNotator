<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import criterionElement from '../components/CriterionElement.vue';
import { useRoute } from "vue-router";
import axios, { HttpStatusCode } from 'axios';

const props = defineProps(['user']);
const route = useRoute();

const datasetCriteria = ref<JSON>();
const allCriteria = ref<JSON>();
const tab = ref<Number>(0);
const selectedCriterion = ref("")

const datasetName: string = route.params.datasetName.toString();

const response = await axios.get(`/datasets/${encodeURIComponent(datasetName)}`, { validateStatus: null });

let criterionContent: string = "";

async function getDatasetCriteria() {
  const response = await axios.get(`/datasets/${encodeURIComponent(datasetName)}/criteria`);
  datasetCriteria.value = response.data;
}

async function getAllCriteria() {
  const response = await axios.get("/criteria/all");
  allCriteria.value = response.data;
}

async function addNewCriterion() {
  //tbd
}

async function assignCriterion() {
  //tbd
}

if (response.status == 200) {
  getDatasetCriteria();
  getAllCriteria();
}
</script>

<template>
  <div v-if="response.status != 200">
    <NavBar view="Dataset not found" :user="props.user" />
    <p>Dataset not found</p>
  </div>
  <div v-else>
    <NavBar :view="`${datasetName} - criteria overview`" :user="props.user" />
    <div class="flex mt-2">
      <div class=" bg-slate-400 rounded-xl m-2 p-2 w-8/12">
        <h1 class="font-bold">Criteria assigned to this dataset:</h1>
        <criterionElement v-for="criterion in datasetCriteria" :data="criterion" />
      </div>
      <div class="bg-slate-400 rounded-xl m-2 p-2 w-1/3">
        <div class="flex m-1">
          <button @click="tab=0" :class="{ 'bg-slate-300': tab == 0}" class="text-nowrap bg-slate-200 p-2 mr-1 rounded-tl-lg hover:bg-slate-300">Add new criterion</button>
          <button @click="tab=1" :class="{ 'bg-slate-300': tab == 1}" class="text-nowrap bg-slate-200 p-2 rounded-tr-lg hover:bg-slate-300">Add existing criterion</button>
        </div>
        <div v-if="tab==0" class="w-full max-w-full">
          <textarea v-model="criterionContent" placeholder="criterion content" class="w-full rounded-xl text-xl h-48 p-1"></textarea>
          <button @click="addNewCriterion" class="text-xl bg-green-500 rounded-xl hover:bg-green-400 text-center w-full">Add</button>
        </div>
        <div v-if="tab==1" class="w-full max-w-full">
          <select v-model="selectedCriterion" class="max-w-full rounded-lg">
            <option value="" disabled>Select criterion</option>
            <option v-for="criterion in allCriteria" :value="criterion" class="overflow-auto ">
              {{ criterion.content }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
