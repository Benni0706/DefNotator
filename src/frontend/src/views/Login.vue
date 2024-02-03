<script setup lang="ts">
import {ref} from "vue";
import defnotatorLogo from "@/assets/logo.svg";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const props = defineProps<{
  login: (username: string, password: string) => Promise<string | null>
}>();

const loginAttempt = ref<boolean>(false);
let inputUsername: string = '';
let inputPassword: string = '';
const loginErrorMessage = ref<string>('');

function login() {
  loginAttempt.value = true;
  loginErrorMessage.value = "";
  props.login(inputUsername, inputPassword)
      .then((errorMessage) => {
        loginAttempt.value = false;
        loginErrorMessage.value = errorMessage ?? ""
      })
}
</script>

<template>
  <div class="grid place-content-center h-screen">
    <LoadingSpinner v-if="loginAttempt" />
    <div v-else>
      <p class="mb-8 text-3xl font-bold text-center flex place-content-center gap-1">
        <img class="h-10" :src="defnotatorLogo" alt="" />
        DefNotator
      </p>
      <div class="p-4 bg-gray-300 rounded-lg">
        <p class="mb-2">Bitte melde dich an, um fortzufahren:</p>
        <p class="font-bold text-red-600">{{ loginErrorMessage }}</p>
        <form @submit.prevent="login" class="grid justify-center">
          <label>Nutzername</label>
          <input class="rounded-md px-1 py-px" type="text" required v-model="inputUsername">
          <label>Password</label>
          <input class="rounded-md px-1 py-px" type="password" required v-model="inputPassword">
          <button class="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 mt-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
