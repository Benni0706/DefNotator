<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Avatar from "@/components/Avatar.vue";
import defnotatorLogo from "@/assets/logo.svg";
import {inject} from "vue";
import type {CurrentUser} from "@/types/provided";

const props = defineProps(['view']);

const currentUser = inject<CurrentUser>("currentUser")!;
</script>

<template>
  <nav class="bg-slate-400 text-2xl flex align-baseline">
    <router-link class="grid place-content-center" to="/">
      <img class="h-10" :src="defnotatorLogo" alt="Home" />
    </router-link>
    <div class="grow grid place-content-center">
      <span class="text-2xl font-bold p-2">{{ props.view }}</span>
    </div>
    <div class="text-2xl ml-auto p-2 group relative">
      <Avatar class="h-10 bg-white" :username="currentUser.username.value" />
      <div class="invisible group-hover:visible absolute top-full right-0 bg-slate-400 flex flex-col gap-1 px-2 py-1 rounded-bl-md">
        <router-link class="hover:underline" :to="{ name: 'Account', params: { userName: currentUser.username.value }}">Profile</router-link>
        <button class="hover:underline" @click="currentUser.logout">Logout</button>
      </div>
    </div>
  </nav>
</template>
