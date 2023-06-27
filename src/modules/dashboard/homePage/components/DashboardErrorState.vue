<template>
  <div class="h-2/5 w-full flex flex-col justify-center items-center bg-white">
    <font-awesome-icon
      class="text-red-500"
      :icon="faCircleExclamation"
      size="3x"
    />
    <h1 class="text-2xl font-semibold text-gray-700">Something went wrong</h1>
    <p class="text-gray-500">Please try again later</p>
  </div>
</template>

<script setup lang="ts">
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
