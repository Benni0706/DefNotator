<script setup lang="ts">
import App from "@/App.vue";
import {onErrorCaptured, ref} from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const error = ref<null | Error>(null);

onErrorCaptured((err) => {
  error.value = err;
});

</script>

<template>
<!-- added suspense to enable top-level await in components for cleaner code -->
  <Suspense >
    <App />
    <template #fallback>
      <div class="h-screen grid place-content-center text-center">
        <div v-if="error">
          <p class="text-xl">Something went wrong</p>
          <p class="opacity-50">({{ error.name }}: {{ error.message }})</p>
        </div>
        <LoadingSpinner v-else />
      </div>
    </template>
  </Suspense>
</template>
