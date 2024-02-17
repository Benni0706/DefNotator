<script setup lang="ts">
import {generateAvatar} from "@/util";
import {twMerge} from "tailwind-merge";

const props = defineProps(['username', 'class']);

</script>

<template>
  <img :class="twMerge('rounded-full', props.class)" :src="generateAvatar(props.username)" alt="" />
</template>
