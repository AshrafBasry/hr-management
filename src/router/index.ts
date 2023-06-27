import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { LoginView, DashboardView } from "./app.resolver";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!localStorage.getItem("user_token") && to.name !== "login") {
    return { name: "login" };
  }

  if (localStorage.getItem("user_token") && to.name !== "dashboard") {
    return { name: "dashboard" };
  }
});

export default router;
