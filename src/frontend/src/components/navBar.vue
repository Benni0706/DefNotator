<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps(['view', 'user']);
</script>

<template>
    <nav class="bg-slate-400 text-2xl flex rounded-xl">
        <span class="text-2xl font-bold p-2">{{ props.view }}</span>
        <router-link class="text-2xl ml-auto p-2 hover:bg-slate-500 rounded-r-xl" :to="{ name: 'Account', params: { userName: props.user.name }}">{{ props.user.name }}</router-link>
    </nav>
</template>