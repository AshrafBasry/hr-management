<template>
  <nav
    class="flex items-center justify-between p-4 bg-gray-50"
    aria-label="Table navigation"
  >
    <span class="text-sm font-normal text-gray-500">
      Showing
      <span class="font-semibold text-gray-900">
        {{ startedEntry }}-{{ lastEntry }}
      </span>
      of
      <span class="font-semibold text-gray-900">
        {{ totalEmployees }}
      </span></span
    >

    <ul class="inline-flex items-center -space-x-px">
      <li>
        <a
          class="pagination__pages block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          @click="goToPage(pagination.page - 1)"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
      <li v-for="page in totalPages" :key="page">
        <a
          class="px-3 py-2 leading-tight border"
          :class="
            page === pagination.page
              ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
              : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700'
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </a>
      </li>
      <li>
        <a
          class="pagination__pages block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          @click="goToPage(pagination.page + 1)"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps<{
  pageEntries: number;
}>();

const totalPages = computed(() => {
  
});

const startedEntry = computed(() => {
  
});

const lastEntry = computed(() => {

});
</script>

<style lang="scss" scoped>
.pagination__pages {
  height: 35px;
}
</style>
