import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import UserDashboard from "../views/User/UserDashboard.vue";
import userSettings from "../views/User/Settings.vue";
import userProfileSettings from "../views/User/profileSettings.vue";
import userAccountSettings from "../views/User/accountSettings.vue";
import Meals from "../views/User/Meals.vue";
import UserStats from "../views/User/UserStats.vue";
import managerDashboard from "../views/Manager/managerDashboard.vue";
import Settings from "../views/Manager/Settings.vue";
import profileSettings from "../views/Manager/profileSettings.vue";
import accountSettings from "../views/Manager/accountSettings.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import AppStats from "../views/Admin/AppStats.vue";
import Users from "../views/Admin/Users.vue";
import Managers from "../views/Admin/Managers.vue";
import adminSettings from "../views/Admin/Settings.vue";
import adminProfileSettings from "../views/Admin/profileSettings.vue";
import adminAccountSettings from "../views/Admin/accountSettings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/UserDashboard",
    name: "UserDashboard",
    component: UserDashboard,
    children: [
      {
        name: "UserDashboardMeals",
        path: "Meals",
        component: Meals,
      },
      {
        name: "UserDashboardStats",
        path: "UserStats",
        component: UserStats,
      },
    ],
  },
  {
    path: "/userSettings",
    name: "userSettings",
    component: userSettings,
    children: [
      {
        path: "userProfileSettings",
        name: "userProfileSettings",
        component: userProfileSettings,
      },
      {
        path: "userAccountSettings",
        name: "userAccountSettings",
        component: userAccountSettings,
      }
    ]
  },
  {
    path: "/managerDashboard",
    name: "managerDashboard",
    component: managerDashboard,
  },
  {
    path: "/managerSettings",
    name: "managerSettings",
    component: Settings,
    children: [
      {
        path: "profileSettings",
        name: "profileSettings",
        component: profileSettings,
      },
      {
        path: "accountSettings",
        name: "accountSettings",
        component: accountSettings,
      }
    ]
  },
  {
    path: "/AdminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    children: [
      {
        name: "AdminDashboardAppStats",
        path: "AppStats",
        component: AppStats,
      },
      {
        name: "AdminDashboardUsers",
        path: "Users",
        component: Users,
      },
      {
        name: "AdminDashboardManagers",
        path: "Managers",
        component: Managers,
      },
    ],
  },
  {
    path: "/adminSettings",
    name: "adminSettings",
    component: adminSettings,
    children: [
      {
        path: "adminProfileSettings",
        name: "adminProfileSettings",
        component: adminProfileSettings,
      },
      {
        path: "adminAccountSettings",
        name: "adminAccountSettings",
        component: adminAccountSettings,
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
