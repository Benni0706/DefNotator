<script setup lang="ts">
import {ref} from "vue";
import defnotatorLogo from "@/assets/logo.svg";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios, {HttpStatusCode} from "axios";

const props = defineProps<{
  login: (username: string, password: string) => Promise<string | null>
}>();

const mode = ref<"login" | "register">("login");
const requestIsGoing = ref<boolean>(false);

let inputUsername: string = '';
let inputPassword: string = '';
const loginErrorMessage = ref<string>('');

function login() {
  requestIsGoing.value = true;
  loginErrorMessage.value = "";
  props.login(inputUsername, inputPassword)
      .then((errorMessage) => {
        requestIsGoing.value = false;
        loginErrorMessage.value = errorMessage ?? ""
      })
}

let registerUsername: string = '';
let registerPassword: string = '';
let registerEmail: string = '';
let registerErrorMessage = ref<string>('');

async function register() {
  requestIsGoing.value = true;
  registerErrorMessage.value = "";
  const response = await axios.post("/users/add", {
    name: registerUsername,
    password: registerPassword,
    email: registerEmail,
  }, { validateStatus: null });
  if (response.status === HttpStatusCode.Ok) {
    setMode("login");
  } else if (response.status === HttpStatusCode.NotFound) {
    registerErrorMessage.value = "Username existiert bereits";
  } else {
    registerErrorMessage.value = "Irgendwas unerwartetes ist schiefgegangen";
  }
  requestIsGoing.value = false;
}

function setMode(newMode: "login" | "register") {
  mode.value = newMode;
}
</script>

<template>
  <div class="grid place-content-center h-screen">
    <LoadingSpinner v-if="requestIsGoing" />
    <div v-else>
      <p class="mb-8 text-3xl font-bold text-center flex place-content-center gap-1">
        <img class="h-10" :src="defnotatorLogo" alt="" />
        DefNotator
      </p>
      <div class="bg-gray-300 rounded-lg">
        <div class="rounded-t-lg overflow-hidden">
          <button :disabled="mode === 'login'" @click="setMode('login')" class="w-1/2 bg-gray-400 disabled:bg-transparent disabled:cursor-default">Login</button>
          <button :disabled="mode === 'register'" @click="setMode('register')" class="w-1/2 bg-gray-400 disabled:bg-transparent disabled:cursor-default">Registrieren</button>
        </div>
        <div class="p-4" v-if="mode === 'login'">
          <p class="mb-2">Bitte melde dich an, um fortzufahren</p>
          <p v-if="loginErrorMessage" class="font-bold text-red-600">{{ loginErrorMessage }}</p>
          <form @submit.prevent="login" class="grid justify-center">
            <label>Nutzername</label>
            <input class="rounded-md px-1 py-px" type="text" required v-model="inputUsername" placeholder="user">
            <label>Password</label>
            <input class="rounded-md px-1 py-px" type="password" required v-model="inputPassword" placeholder="****">
            <button type="submit" class="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 mt-2 rounded-md">Login</button>
          </form>
        </div>
        <div class="p-4" v-if="mode === 'register'">
          <p class="mb-2">Bitte gebe deine Daten an, um dich zu Registrieren</p>
          <p v-if="registerErrorMessage" class="font-bold text-red-600">{{ registerErrorMessage }}</p>
          <form @submit.prevent="register" class="grid justify-center">
            <label>Nutzername</label>
            <input class="rounded-md px-1 py-px" type="text" required v-model="registerUsername" placeholder="user">
            <label>Email</label>
            <input class="rounded-md px-1 py-px" type="text" required v-model="registerEmail" placeholder="user@domain.com">
            <label>Password</label>
            <input class="rounded-md px-1 py-px" type="password" required v-model="registerPassword" placeholder="****">
            <button type="submit" class="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 mt-2 rounded-md">Registrieren</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
