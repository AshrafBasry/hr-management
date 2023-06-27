<template>
  <div>
    <dashboard-navbar />
    <div class="container card mx-auto px-4 sm:px-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "./DashboardNavbar.vue";
</script>
