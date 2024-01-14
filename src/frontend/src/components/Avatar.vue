<script setup lang="ts">
import {generateAvatar, username2initials} from "@/util";
import {twMerge} from "tailwind-merge";

const props = defineProps(['username', 'class']);

</script>

<template>
  <img :class="twMerge('rounded-full', props.class)" :src="generateAvatar(username2initials(props.username))" alt="" />
</template>
