<script setup lang="ts">
import { RouterView } from 'vue-router'
import {provide, ref} from 'vue';
import axios, { HttpStatusCode } from 'axios';
import router from './router';
import LoginPage from "@/views/Login.vue";
import type {CurrentUser} from "@/types/provided";

const isLoggedIn = ref<boolean>(false);
const username = ref<string>("");

async function updateUsername() {
  const response = await axios.get<{ id: number, name: string, email: string }>("/users");
  username.value = response.data.name;
  isLoggedIn.value = true;
}

try {
  await updateUsername();
} catch (_) {}

async function logout() {
  // .catch may lead to failure
  await axios.post("/users/logout").catch(() => alert("Logout failed"));
  username.value = "";
  isLoggedIn.value = false;
  await router.push('/');
}

async function login(username: string, password: string) {
  const response = await axios.post("/users/login", { name: username, password: password }, { validateStatus: null });
  if (response.status == HttpStatusCode.Ok) {
      await updateUsername();
      return null;
  } else if (response.status == HttpStatusCode.Unauthorized) {
    return 'Nutzername oder Passwort sind falsch.';
  } else {
    return 'Es ist ein unerwarteter Fehler aufgetreten.';
  }
}

provide<CurrentUser>("currentUser", {
  username: username,
  logout: logout,
});
</script>

<template>
  <main>
    <div v-if="isLoggedIn">
        <RouterView />
    </div>
    <div v-else>
      <LoginPage :login="login" />
    </div>
  </main>
</template>
