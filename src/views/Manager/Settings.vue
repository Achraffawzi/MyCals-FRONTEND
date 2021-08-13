<template>
  <div class="settings">
    <div class="navbar">
      <v-container class="d-flex align-center justify-space-between pa-3">
        <div class="logo text-uppercase grey--text">
          <span class="">My</span>
          <span class="primary--text">Cals</span>
        </div>

        <!-- <v-spacer></v-spacer> -->

        <div class="links">
          <router-link
            v-for="(item, index) in accountRouteObj"
            :key="index"
            :to="item.route"
            class="ma-3"
          >{{ item.title }}</router-link>
          <span style="cursor: pointer;" @click="handleSignout">Sign out</span>
        </div>
      </v-container>
    </div>

    <div class="main-content">
      <v-container>
        <v-row>
          <!-- Navigations -->
          <v-col cols="12" md="4">
            <!-- title -->
            <h3 class="mb-15 text-h4">Settings</h3>
            <div v-for="item in items" :key="item.title" class="mb-4">
              <router-link :to="item.route" class="d-flex align-center pa-2">
                <v-icon large class="mr-3">{{ item.icon }}</v-icon>
                <div>
                  <span class="d-block font-weight-bold">{{ item.title }}</span>
                  <span>{{ item.description }}</span>
                </div>
              </router-link>
            </div>
          </v-col>
          <!-- Navigation Content -->
          <v-col cols="12" md="7" class="offset-sm-0 offset-md-1">
            <transition name="settingsTransition" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
// import { END_POINTS, createApiEndPoints, IMAGE_URL } from "@/api.js";
export default {
  name: "Settings",
  data() {
    return {
      // userAvatarSrc: "",
      // userNameAvatar: "",

      accountRouteObj: [
        { title: "dashboard", route: "/managerDashboard" }
      ],//{ title: "Settings", route: "/managerSettings" }

      // Bindings for the app bar component
      drawer: false,

      // Binding All links
      items: [
        {
          icon: "badge",
          title: "Profile Settings",
          route: "/managerSettings/profileSettings",
          description: "Manage and Edit your profile information"
        },
        {
          icon: "admin_panel_settings",
          title: "Account Settings",
          route: "/managerSettings/accountSettings",
          description: "change your account password"
        },
      ],
    };
  },

  methods: {
    // Sign out functionality
    handleSignout() {
      localStorage.removeItem("L_T");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link-exact-active,
.router-link-active {
  background: #ecebeb;
}
// router transition
.settingsTransition-enter-active {
  animation: route-enter 0.56s;
  opacity: 0;
  animation-delay: 0.1s;
}

.settingsTransition-leave-active {
  animation: route-leave 0.56s;
}

@keyframes route-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes route-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}

// Chrome
@-webkit-keyframes route-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes route-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}

// Mozilla
@-moz-keyframes route-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@-moz-keyframes route-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}

// Opera
@-o-keyframes route-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@-o-keyframes route-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}

// IE
@-ms-keyframes route-enter {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@-ms-keyframes route-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}
</style>
