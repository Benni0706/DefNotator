<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import axios, { HttpStatusCode } from 'axios';
import router from './router';
import defnotatorLogo from "./assets/logo.svg";

let logged_in = ref<boolean>(true);
const user = ref(null);

async function getUser() {
  const response = await axios.get("/users");
  user.value = response.data;
  logged_in.value = true;
}

getUser();

async function logout() {
  // .catch may lead to failure
  await axios.post("/users/logout").catch(() => alert("Logout failed"));
  user.value = null;
  logged_in.value = false;
  await router.push('/');
}

let username: string = '';
let password: string = '';
const login_message = ref<string>('');

async function login() {
  const response = await axios.post("/users/login", { name: username, password: password }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
      login_message.value = '';
      await getUser();
  } else if (response.status == HttpStatusCode.Unauthorized) {
    login_message.value = 'Nutzername oder Passwort sind falsch.';
  } else {
    login_message.value = 'Es ist ein unerwarteter Fehler aufgetreten.';
  }
}
</script>

<template>
  <main>
    <div v-if="logged_in && user">
      <Suspense>
        <RouterView :user="user" :logoutCurrentUser="logout" test="Hello World" />
      </Suspense>
    </div>
    <div v-else-if="!logged_in && !user" class="grid items-center justify-center w-full h-screen">
      <div class="text-center">
        <p class="mb-8 text-3xl font-bold">DefNotator</p>
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="grid items-center justify-center w-full h-screen">
      <div>
        <p class="mb-8 text-3xl font-bold text-center flex place-content-center gap-1">
          <img class="h-10" :src="defnotatorLogo" alt="" />
          DefNotator
        </p>
        <div class="p-4 bg-gray-300 rounded-lg">
          <p class="mb-2">Bitte melde dich an, um fortzufahren:</p>
          <p class="font-bold text-red-600">{{ login_message }}</p>
          <form @submit.prevent="login" class="grid justify-center">
            <label>Nutzername</label>
            <input class="rounded-md px-1 py-px" type="text" required v-model="username">
            <label>Password</label>
            <input class="rounded-md px-1 py-px" type="password" required v-model="password">
            <button class="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 mt-2 rounded-md">Login</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
