<template>
  <div
    class="employee-details__modal h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
  >
    <div class="relative w-full max-w-lg max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="modalState.isOpened = false"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-8 text-xl font-medium text-gray-900">
            {{ newEmployee ? "Add Employee" : "Edit Employee" }}
          </h3>
          <form class="space-y-4" @submit.prevent="saveEmployee">
            <div
              v-if="modalState.hasError"
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {{ modalState.errorMessage }}
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Employee Name
              </label>
              <input
                v-model="employee.name"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                for="Title"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                v-model="employee.title"
                type="text"
                name="Title"
                id="Title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Software Engineer"
                required
              />
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full group">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  v-model="employee.email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div class="relative z-0 w-full group mt-3 md:mt-0">
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <input
                  v-model="employee.phone"
                  type="tel"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="+1 (555) 987-6543"
                  required
                />
              </div>
            </div>
            <div>
              <label
                for="Address"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                v-model="employee.address"
                type="text"
                name="Address"
                id="Address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="123 Main St."
              />
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full group">
                <label
                  for="joinedDate"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Joined At
                </label>
                <input
                  v-model="employee.joined_at"
                  type="date"
                  name="joinedDate"
                  id="joinedDate"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="12/01/2021"
                  required
                />
              </div>

              <div class="relative z-0 w-full group mt-3 md:mt-0">
                <label
                  for="salary"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Salary ($) / Month
                </label>
                <input
                  v-model="employee.salary"
                  type="Number"
                  name="salary"
                  id="salary"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="5000"
                  required
                />
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full group">
                <label
                  for="department"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Department
                </label>
                <select
                  v-model="employee.department"
                  name="department"
                  id="department"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div class="relative z-0 w-full group mt-3 md:mt-0">
                <label
                  for="manager"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Manager
                </label>
                <select
                  v-model="employee.manager"
                  name="manager"
                  id="manager"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" selected>N/A</option>
                  <option
                    v-for="manager in formattedEmployeesData"
                    v-bind:key="manager._id"
                    :value="manager._id"
                  >
                    {{ manager.name }}
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              class="mt-16 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useEmployeeStore } from "@/store/employee.store";
import { storeToRefs } from "pinia";

const { editableEmployee, formattedEmployeesData, modalState } = storeToRefs(
  useEmployeeStore()
);
const newEmployee = ref(modalState.value.isNewEmployee);

const employee = ref({
  name: newEmployee.value ? "" : editableEmployee.value?.name || "",
  title: newEmployee.value ? "" : editableEmployee.value?.title || "",
  email: newEmployee.value ? "" : editableEmployee.value?.email || "",
  phone: newEmployee.value ? "" : editableEmployee.value?.phone || "",
  address: newEmployee.value ? "" : editableEmployee.value?.address || "",
  joined_at: newEmployee.value
    ? ""
    : editableEmployee.value?.joined_at
    ? new Date(editableEmployee.value?.joined_at).toISOString().substr(0, 10)
    : "",
  salary: newEmployee.value ? 0 : editableEmployee.value?.salary || 0,
  department: newEmployee.value ? "" : editableEmployee.value?.department || "",
  manager: newEmployee.value ? "" : editableEmployee.value?.manager || "",
});

onUnmounted(() => {
  resetModalState();
});

const saveEmployee = () => {
  resetModalState();
  if (newEmployee.value) {
    useEmployeeStore().createNewEmployee(employee.value);
  } else {
    useEmployeeStore().updateEmployee({
      ...employee.value,
      _id: editableEmployee.value?._id,
    });
  }
};

const resetModalState = () => {
  modalState.value = {
    ...modalState.value,
    hasError: false,
    errorMessage: "",
  };
};
</script>

<style scoped lang="scss">
.employee-details__modal {
  transition: all 0.2s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  inset: 0;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
}
</style>
