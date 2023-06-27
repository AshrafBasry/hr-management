<template>
  <tbody>
    <tr
      v-for="employee in employeesData"
      :key="employee._id"
      class="bg-white border-b hover:bg-gray-50"
    >
      <td v-for="field in tableFields" :key="field.label" class="px-3 py-4">
        {{ employee[field.key] || "-" }}
      </td>
      <td class="px-3 py-4">
        <a
          class="font-medium text-blue-600 hover:underline cursor-pointer"
          @click="$emit('editEmployee', employee._id)"
        >
          <font-awesome-icon :icon="faPenToSquare" />
        </a>
        <a
          class="font-medium text-red-600 hover:underline ml-4 cursor-pointer"
          @click="$emit('deleteEmployee', employee._id)"
        >
          <font-awesome-icon :icon="faTrash" />
        </a>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FormattedEmployee } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  employeesData: FormattedEmployee[];
  tableFields: { label: string; key: string; sortable: boolean }[];
}

defineProps<Props>();
</script>
