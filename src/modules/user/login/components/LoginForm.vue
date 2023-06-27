<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
    <div
      v-if="loginState.hasError"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {{ loginState.errorMessage }}
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Your email
      </label>

      <input
        v-model="credentials.email"
        type="email"
        name="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder="name@company.com"
        @input="loginState.hasError = false"
        required
      />
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        Password
      </label>

      <input
        v-model="credentials.password"
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        @input="loginState.hasError = false"
        required
      />
    </div>

    <button
      type="submit"
      class="login-page__submit w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      :disabled="loginState.isLoading"
    >
      Sign in
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth.store";

const credentials = ref({
  email: "",
  password: "",
});

const { loginState } = storeToRefs(useAuthStore());

onUnmounted(() => {
  loginState.value.hasError = false;
});

const submitLogin = () => {
  useAuthStore().loginUser(credentials.value);
};
</script>

<style lang="scss" scoped>
.login-page {
  &__submit {
    transition: all 0.3s ease-in-out;
  }
}
</style>
