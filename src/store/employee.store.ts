import { defineStore } from "pinia";
import { ref } from "vue";
import api from "./api";
import { Employee } from "@/types";

export const useEmployeeStore = defineStore("employee", () => {
  const employeesData = ref<Array<Employee>>([]);
  const searchTerm = ref<string>("");

  const pagination = ref<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });

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

  function searchEmployees(query: string) {
    searchTerm.value = query.trim();
    pagination.value.page = 1;
  }

  const employeesDataFiltered = computed(() => {
    return employeesData.value.filter((employee) => {
      return Object.values(employee).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.value.toLowerCase());
        }
      });
    });
  });

  const totalEmployees = computed<number>(() => {
    return employeesDataFiltered.value.length;
  });

  const formattedEmployeesData = computed<FormattedEmployee[]>(() => {
    const mapEmployeeObject = employeesDataFiltered.value.map((employee) => {
      return {
        ...employee,
        name: capitalize(employee.name),
        manager:
          employee.manager &&
          capitalize(
            employeesData.value.find(
              (manager) => manager._id === employee.manager
            )?.name
          ),
        joined_at: new Date(employee.joined_at).toLocaleDateString(),
        salary: employee.salary.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      };
    });

    const paginatedEmployees = mapEmployeeObject.slice(
      (pagination.value.page - 1) * pagination.value.limit,
      pagination.value.page * pagination.value.limit
    );

    return paginatedEmployees;
  });

  return {
    getEmployees,
    searchEmployees,
    formattedEmployeesData,
    totalEmployees,
    dashboardState,
    modalState,
    pagination,
  };
});
