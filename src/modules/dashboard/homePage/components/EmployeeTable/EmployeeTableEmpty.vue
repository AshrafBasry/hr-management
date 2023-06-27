<template>
  <div class="h-52 w-full flex flex-col justify-center items-center bg-white">
    <font-awesome-icon class="text-gray-700" :icon="faFilter" size="3x" />
    <h2 class="text-lg font-semibold my-2 text-gray-700">No Employees found</h2>
    <p class="text-gray-500 hidden lg:block">
      There are no employees that match your chosen filter(s), try a different
      filter(s) to find what you're looking for.
    </p>
  </div>
</template>

<script setup lang="ts">
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
