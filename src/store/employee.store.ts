import { defineStore } from "pinia";
import { ref } from "vue";
import api from "./api";
import { Employee } from "@/types";

export const useEmployeeStore = defineStore("employee", () => {
  const employeesData = ref<Array<Employee>>([]);

  const dashboardState = ref<{
    isLoading: boolean;
    hasError: boolean;
    isEmpty: boolean;
  }>({
    isLoading: false,
    hasError: false,
    isEmpty: false,
  });

  function getEmployees() {
    dashboardState.value.isLoading = true;
    return api
      .get("employees")
      .then((response) => {
        employeesData.value = response.data.employees;
      })
      .catch(() => {
        dashboardState.value.hasError = true;
      })
      .finally(() => {
        dashboardState.value.isLoading = false;
      });
  }

  return {
    getEmployees,
    dashboardState,
  };
});
