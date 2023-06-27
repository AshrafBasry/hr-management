<template>
  <dashboard-layout>
    <div class="dashboard">
      <section>
        <div
          class="flex flex-col items-end px-6 py-8 mx-auto max-w-screen-lg h-screen"
        >
          <employee-add-btn />
          <employee-filters />
          <dashboard-loading-state v-if="dashboardState.isLoading" />
          <dashboard-error-state v-if="dashboardState.hasError" />
          <employee-table
            v-if="!dashboardState.isLoading && !dashboardState.hasError"
          />
        </div>
      </section>
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import EmployeeAddBtn from "../components/EmployeeAddBtn.vue";
import EmployeeFilters from "../components/EmployeeFilters.vue";
import DashboardErrorState from "../components/DashboardErrorState.vue";
import DashboardLoadingState from "../components/DashboardLoadingState.vue";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable.vue";
import DashboardLayout from "../../common/components/DashboardLayout.vue";

import { storeToRefs } from "pinia";
import { useEmployeeStore } from "@/store/employee.store";

const { dashboardState } = storeToRefs(useEmployeeStore());

onMounted(() => {
  useEmployeeStore().getEmployees();
});
</script>
