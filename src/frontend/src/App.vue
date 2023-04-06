<script setup lang="ts">
import { RouterView } from 'vue-router'
let loggedIn = true;
</script>

<template>
  <main>
    <div v-if="loggedIn">
      <RouterView />
    </div>
    <div v-else class="h-screen w-full grid justify-center items-center">
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
  </main>
</template>
