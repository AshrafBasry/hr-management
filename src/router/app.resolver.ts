export const LoginView = () =>
  import(
    /* webpackChunkName: "loginPage" */ "@/modules/user/login/views/LoginPage.vue"
  );

export const DashboardView = () =>
  import(
    /* webpackChunkName: "dashboardPage" */ "@/modules/dashboard/homePage/views/DashboardPage.vue"
  );
