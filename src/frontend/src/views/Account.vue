<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Avatar from "@/components/Avatar.vue";
// import NotFound from "@/views/404.vue";

const route = useRoute();

const username: string = route.params.username.toString();

const response = await axios.get(`/users/by-name/${encodeURIComponent(username)}`, { validateStatus: null });
</script>

<template>
  <div v-if="response.status != 200">
    <NavBar view="Account Not Found" />
    <p>Account Not Found</p>
  </div>
  <div v-else>
    <NavBar :view="`Account - ${username}`" />
    <main class="p-2">
      <div class="flex gap-2">
        <Avatar class="h-10 border border-black" :username="username" />
        <div class="grow">
          <h1 class="text-3xl">{{ username }}</h1>
        </div>
      </div>
    </main>
  </div>
</template>
