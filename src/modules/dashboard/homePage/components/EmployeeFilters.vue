<template>
  <div
    class="search__card w-full bg-white border border-gray-200 rounded shadow"
  >
    <div class="search__box w-full">
      <label class="flex justify-center items-center" for="search">
        <font-awesome-icon
          class="p-2 text-gray-600"
          :icon="faMagnifyingGlass"
        />
      </label>
      <input
        class="p-2 dark:bg-gray-800 dark:border-gray-700 focus:outline-none flex-grow"
        id="search"
        type="text"
        placeholder="Search"
        @input="filterEmployees"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style lang="scss" scoped>
.search {
  &__card {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  &__box {
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
