<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import router from './router';

let logged_in = ref<boolean>(true);
const user = ref(null);

async function getUser() {
  try {
    const api_url = import.meta.env.VITE_API_URL + '/users';
    let data = await fetch(api_url, {
      method: "GET",
      credentials: "include"
    });
    if (data.ok) {
      user.value = await data.json();
      logged_in.value = true;
    }
  }
  catch (err: any) {
    console.log(err);
  }
}

getUser();

async function logout() {
  user.value = null;
  logged_in.value = false;
  router.push('/');
  try {
    const api_url = import.meta.env.VITE_API_URL + '/users/logout';
    await fetch(api_url, {
      method: "POST",
      credentials: "include"
    });
  }
  catch (err: any) {
    console.log(err);
  }
}

let username: string = '';
let password: string = '';
const login_message = ref<string>('');

async function login() {
  try {
    const api_url = import.meta.env.VITE_API_URL + '/users/login';
    let response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ name: username, password: password })
    });
    if (response.ok) {
      login_message.value = '';
      getUser();
    } else if (response.status == 401) {
      login_message.value = 'Nutzername oder Passwort sind falsch.';
    } else {
      login_message.value = 'Es ist ein unerwarteter Fehler aufgetreten.';
    }
  }
  catch (err: any) {
    console.log(err);
  }
}
</script>

<template>
  <main>
    <div v-if="logged_in && user">
      <RouterView />
    </div>
    <div v-else-if="!logged_in && !user" class="h-screen w-full grid justify-center items-center">
      <div class="text-center">
        <p class="text-3xl font-bold mb-8">DefNotator</p>
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="h-screen w-full grid justify-center items-center">
      <div>
        <p class="text-3xl font-bold mb-8 text-center">DefNotator</p>
        <div class="bg-gray-300 p-4 rounded-lg">
          <p class="mb-2">Bitte melde dich an, um fortzufahren:</p>
          <p class="text-red-600 font-bold">{{ login_message }}</p>
          <form @submit.prevent="login" class="grid justify-center">
            <label>Nutzername</label>
            <input type="text" required v-model="username">
            <label>Password</label>
            <input type="password" required v-model="password">
            <button class="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 mt-2">Login</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
