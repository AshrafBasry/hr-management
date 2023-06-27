<template>
  <div>
    <button
      type="button"
      class="create-employee__button bg-white text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded"
      @click="openAddEmployeeModal"
    >
      <FontAwesomeIcon :icon="faPlus" class="w-5 h-5" />
      <span class="ml-2">Add Employee</span>
    </button>

    <employee-details-modal
      v-if="modalState.isOpened && modalState.isNewEmployee"
    />
  </div>
</template>

<script setup lang="ts">
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import EmployeeDetailsModal from "./EmployeeDetailsModal.vue";

import { storeToRefs } from "pinia";
import { useEmployeeStore } from "@/store/employee.store";

const { modalState } = storeToRefs(useEmployeeStore());

function openAddEmployeeModal() {
  modalState.value.isOpened = true;
  modalState.value.isNewEmployee = true;
}
</script>

<style lang="scss" scoped>
.create-employee {
  &__button {
    transition: all 0.2s ease-in-out;
    padding: 0.5rem 1.5rem;
    text-align: center;
    display: inline-flex;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
