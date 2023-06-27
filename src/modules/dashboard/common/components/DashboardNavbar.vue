<template>
  <nav class="bg-white border-gray-200 p-3">
    <div
      class="max-w-screen-lg flex flex-wrap items-center justify-end mx-auto p-4"
    >
      <div class="w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col font-medium p-0 mt-0 border-0 rounded-lg md:flex-row space-x-8"
        >
          <li>
            <a
              class="flex flex-row text-gray-900 rounded hover:bg-transparent border-0 hover:text-blue-700 p-0 cursor-pointer"
              @click="logout"
            >
              <FontAwesomeIcon
                :icon="faArrowRightFromBracket"
                class="mr-2 flex justify-center items-center w-5 h-5"
              />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { useAuthStore } from "@/store/auth.store";

const logout = () => {
  useAuthStore().logoutUser();
};
</script>
