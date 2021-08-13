import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

import Unauthorized from "../views/unauthorized.vue";
import NotFound from "../views/NotFound.vue";

import UserDashboard from "../views/User/UserDashboard.vue";
import userSettings from "../views/User/Settings.vue";
import Meals from "../views/User/Meals.vue";
import userProfileSettings from "../views/User/profileSettings.vue";
import userAccountSettings from "../views/User/accountSettings.vue";

import managerDashboard from "../views/Manager/managerDashboard.vue";
import Settings from "../views/Manager/Settings.vue";
import profileSettings from "../views/Manager/profileSettings.vue";
import accountSettings from "../views/Manager/accountSettings.vue";

import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import Users from "../views/Admin/Users.vue";
import Managers from "../views/Admin/Managers.vue";
import adminSettings from "../views/Admin/Settings.vue";
import adminProfileSettings from "../views/Admin/profileSettings.vue";
import adminAccountSettings from "../views/Admin/accountSettings.vue";

import AuthMailConfirmation from "../views/AuthMailConfirmation.vue";
import ResetPassword from "../views/ResetPassword.vue";

import {getUserPath} from '../globalFunctions.js'

Vue.use(VueRouter);

const routes = [
  // Main routes
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      let l_t = localStorage.getItem('L_T');
      if(l_t != null) {

        let path = getUserPath(l_t);


        next({ path: path })

      }
      else next();
    },
    meta: {
      isSecured: false,
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    beforeEnter: (to, from, next) => {
      let l_t = localStorage.getItem('L_T');
      if(l_t != null) {

        let path = getUserPath(l_t);

        next({ path: path })

      }
      else next();
    },
    meta: {
      isSecured: false,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      let l_t = localStorage.getItem('L_T');
      if(l_t != null) {

        let path = getUserPath(l_t);

        next({ path: path })

      }
      else next();
    },
    meta: {
      isSecured: false,
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: (to, from, next) => {
      let l_t = localStorage.getItem('L_T');
      if(l_t != null) {

        let path = getUserPath(l_t);

        next({ path: path })

      }
      else next();
    },
    meta: {
      isSecured: false,
    }
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: Unauthorized,
  },
  {
    path: "*",
    component: NotFound,
  },
  // User routes
  {
    path: "/UserDashboard",
    name: "UserDashboard",
    component: UserDashboard,
    children: [
      {
        name: "UserDashboardMeals",
        path: "Meals",
        component: Meals,
        meta: {
          isSecured: true,
        }
      },
    ],
    meta: {
      isSecured: true,
    }
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
        meta: {
          isSecured: true,
        }
      },
      {
        path: "userAccountSettings",
        name: "userAccountSettings",
        component: userAccountSettings,
        meta: {
          isSecured: true,
        }
      }
    ],
    meta: {
      isSecured: true,
    }
  },

  // Manager route
  {
    path: "/managerDashboard",
    name: "managerDashboard",
    component: managerDashboard,
    meta: {
      isSecured: true,
    }
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
        meta: {
          isSecured: true,
        },
      },
      {
        path: "accountSettings",
        name: "accountSettings",
        component: accountSettings,
        meta: {
          isSecured: true,
        },
      }
    ],
    meta: {
      isSecured: true,
    }
  },

  // Admin routes
  {
    path: "/AdminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    children: [
      {
        name: "AdminDashboardUsers",
        path: "Users",
        component: Users,
        meta: {
          isSecured: true,
        }
      },
      {
        name: "AdminDashboardManagers",
        path: "Managers",
        component: Managers,
        meta: {
          isSecured: true,
        }
      },
    ],
    meta: {
      isSecured: true,
    }
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
        meta: {
          isSecured: true,
        }
      },
      {
        path: "adminAccountSettings",
        name: "adminAccountSettings",
        component: adminAccountSettings,
        meta: {
          isSecured: true,
        }
      }
    ],
    meta: {
      isSecured: true,
    }
  },

  // Confirmation routes
  {
    path: "/authemailconfirmation",
    name: "authemailconfirmation",
    component: AuthMailConfirmation
  },

  // Reset Password
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: ResetPassword
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem('L_T');

  if(to.meta.isSecured && to.path !== from.path) {
    if(token != null && (to.path === getUserPath(token) || to.meta.isSecured )) {
      next();
    } else {
      next({ name: "unauthorized" });
    }
  }
  else next();

});

export default router;
