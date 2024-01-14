<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import Avatar from "@/components/Avatar.vue";
// import NotFound from "@/views/404.vue";

const props = defineProps(['user', 'logoutCurrentUser']);
const route = useRoute();

const userName: string = route.params.userName.toString();

const response = await axios.get(`/users/by-name/${encodeURIComponent(userName)}`, { validateStatus: null });
</script>

<template>
  <div v-if="response.status != 200">
    <NavBar view="Account Not Found" :user="props.user" />
    <p>Account Not Found</p>
  </div>
  <div v-else>
    <NavBar :view="`Account - ${userName}`" :user="props.user" :logout-current-user="props.logoutCurrentUser" />
    <main class="p-2">
      <div class="flex gap-2">
        <Avatar class="h-10 border border-black" :username="props.user.name" />
        <div class="grow">
          <h1 class="text-3xl">{{ props.user.name }}</h1>
        </div>
      </div>
    </main>
  </div>
</template>
