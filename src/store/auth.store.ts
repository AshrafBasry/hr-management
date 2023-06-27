import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";

import api from "./api";

interface credentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  const userData = ref({
    name: "",
    email: "",
    user_token: "",
  });

  const loginState = ref({
    isLoading: false,
    hasError: false,
    errorMessage: "",
  });

  const loginUser = (credentials: credentials) => {
    loginState.value.isLoading = true;
    api
      .post("login", credentials)
      .then((response) => {
        userData.value = response.data;
        localStorage.setItem("user_token", response.data.user_token);
        router.push({ name: "dashboard" });
      })
      .catch((error) => {
        loginState.value.hasError = true;
        loginState.value.errorMessage = error.response.data.message;
      })
      .finally(() => {
        loginState.value.isLoading = false;
      });
  };

  const logoutUser = () => {
    api
      .get("logout")
      .then(() => {
        localStorage.removeItem("user_token");
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { userData, loginState, loginUser, logoutUser };
});
