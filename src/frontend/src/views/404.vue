<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
</script>

<template>
  <main class="">
    <NavBar view="404 Not Found" />
    <div class="grid place-content-center text-center gap-2 max-w-xl mx-auto mt-5">
      <h1 class="text-4xl">404 Not Found</h1>
      <p>The requested URL was not found. If you entered the URL manually please check your spelling and try again.</p>
      <router-link class="hover:underline text-blue-600" to="/">Go to the Dashboard</router-link>
    </div>
  </main>
</template>
