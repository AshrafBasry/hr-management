<template>
  <div class="w-full relative overflow-x-auto shadow-md rounded">
    <table
      class="w-full text-sm text-left text-gray-500"
      :class="!formattedEmployeesData.length && 'flex flex-col'"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr :class="!formattedEmployeesData.length && 'flex justify-between'">
          <th
            v-for="field in tableFields"
            v-bind:key="field.key"
            scope="col"
            class="p-3 font-semibold tracking-wider"
            :class="{
              'cursor-pointer': field.sortable,
              'text-blue-500': sortOptions.sortBy === field.key,
            }"
            @click="field.sortable ? sort(field.key) : null"
          >
            {{ field.label }}
            <font-awesome-icon
              v-if="field.sortable"
              :icon="
                sortOptions.sortBy === field.key &&
                sortOptions.sortDirection === 'desc'
                  ? faArrowUpWideShort
                  : faArrowDownWideShort
              "
              class="hidden ml-1 lg:inline-block"
            />
          </th>
          <th scope="col" class="p-3 font-semibold tracking-wider">Actions</th>
        </tr>
      </thead>
      <employee-table-empty v-if="!formattedEmployeesData.length" />
      <employee-table-body
        v-if="formattedEmployeesData.length"
        :employees-data="formattedEmployeesData"
        :table-fields="tableFields"
        @edit-employee="editEmployee"
        @delete-employee="deleteEmployee"
      />
    </table>
    <employee-table-pagination
      v-if="formattedEmployeesData.length"
      :page-entries="formattedEmployeesData.length"
    />
    <new-employee-modal
      v-if="modalState.isOpened && !modalState.isNewEmployee"
      :new-employee="false"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { useEmployeeStore } from "@/store/employee.store";

import EmployeeTableBody from "../EmployeeTable/EmployeeTableBody.vue";
import EmployeeTablePagination from "../EmployeeTable/EmployeeTablePagination.vue";
import NewEmployeeModal from "../EmployeeDetailsModal.vue";
import EmployeeTableEmpty from "../EmployeeTable/EmployeeTableEmpty.vue";

const { formattedEmployeesData, modalState } = storeToRefs(useEmployeeStore());

const tableFields = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "joined_at",
    label: "Joined",
    sortable: true,
  },
  {
    key: "department",
    label: "Department",
    sortable: true,
  },
  {
    key: "manager",
    label: "Manager",
    sortable: true,
  },
  {
    key: "salary",
    label: "Salary",
    sortable: true,
  },
];

const sort = (key: string) => {
  const sortOptionsValue = sortOptions.value;

  const field = tableFields.find((field) => field.key === key);
  if (!field) return;

  if (sortOptionsValue.sortBy !== key) {
    sortOptionsValue.sortBy = key;
    sortOptionsValue.sortDirection = "asc";
  } else {
    if (sortOptionsValue.sortDirection === "asc") {
      sortOptionsValue.sortDirection = "desc";
    } else {
      sortOptionsValue.sortDirection = "asc";
    }
  }

  useEmployeeStore().sortEmployeesBy(sortOptionsValue);
};

const editEmployee = (employeeId: string) => {
  useEmployeeStore().setEmployeeToEdit(employeeId);
  modalState.value.isOpened = true;
  modalState.value.isNewEmployee = false;
};

const deleteEmployee = (employeeId: string) => {
  useEmployeeStore().deleteEmployee(employeeId);
};

const sortOptions = ref({
  sortBy: "name",
  sortDirection: "asc",
});
</script>
