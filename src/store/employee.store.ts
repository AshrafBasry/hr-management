import { defineStore } from "pinia";
import { ref } from "vue";
import api from "./api";
import { Employee, FormattedEmployee } from "@/types";

export const useEmployeeStore = defineStore("employee", () => {
  const employeesData = ref<Array<Employee>>([]);
  const searchTerm = ref<string>("");

  const pagination = ref<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  });

  const editableEmployee = ref<Employee | null>(null);
  const modalState = ref<{
    hasError: boolean;
    errorMessage: string;
    isOpened: boolean;
    isNewEmployee?: boolean;
  }>({
    isOpened: false,
    hasError: false,
    errorMessage: "",
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

  function createNewEmployee(employee: Employee) {
    return api
      .post("employee", employee)
      .then((response) => {
        employeesData.value.push(response.data.employee);
        modalState.value.isOpened = false;
      })
      .catch((error) => {
        modalState.value.hasError = true;
        modalState.value.errorMessage = error.response.data.message;
      });
  }

  function setEmployeeToEdit(employeeId: string) {
    const employee = employeesData.value.find(
      (employee) => employee._id === employeeId
    );
    editableEmployee.value = employee ? employee : null;
  }

  function updateEmployee(employee: Employee) {
    return api
      .put(`employee/${employee._id}`, employee)
      .then((response) => {
        modalState.value.isOpened = false;
        const index = employeesData.value.findIndex(
          (employee) => employee._id === response.data.employee._id
        );
        employeesData.value[index] = response.data.employee;
      })
      .catch((error) => {
        modalState.value.hasError = true;
        modalState.value.errorMessage = error.response.data.message;
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
    createNewEmployee,
    searchEmployees,
    updateEmployee,
    setEmployeeToEdit,
    formattedEmployeesData,
    editableEmployee,
    totalEmployees,
    dashboardState,
    modalState,
    pagination,
  };
});
