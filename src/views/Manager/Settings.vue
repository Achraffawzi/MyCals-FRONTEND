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
          <!-- current logged in User avatar -->
          <!-- <v-avatar v-if="userAvatarSrc != ''">
            <img
              :src="userAvatarSrc"
              max-width="40"
              class="rounded-circle"
              style="cursor: pointer"
            />
          </v-avatar>
          <v-avatar v-else color="primary" size="40">
            <span class="white--text text-h5">{{
              userNameAvatar
            }}</span>
          </v-avatar> -->
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
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- <v-navigation-drawer
      v-model="drawer"
      class="primary white--text"
      app
      absolute
      temporary
    >
      <div
        class="
          subheading
          white--text
          text-center
          my-16
          dashboard__app-name dashboard-title
        "
      >
        Settings
      </div>

      <v-list nav shaped>
        <v-list-item-group v-model="drawer">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
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

      accountRouteObj: [],//{ title: "Settings", route: "/managerSettings" }

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

  // mounted() {
  //   this.getUserAvatar(); // Get the user avatar
  // },

  methods: {
    // Get User profile pic / Avatar
    // getUserAvatar() {
    //   createApiEndPoints(END_POINTS.GET_USER_PROFILE)
    //     .fetch()
    //     .then((response) => {
    //       if (response.data.pictureUser != null) {
    //         this.userAvatarSrc = IMAGE_URL + "" + response.data.pictureUser;
    //       } else {
    //         // Set default avatar
    //         this.userNameAvatar =
    //           response.data.firstName.charAt(0).toUpperCase() +
    //           "" +
    //           response.data.lastName.charAt(0).toUpperCase();
    //       }
    //     })
    //     .catch((error) => console.log(error));
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
</style>
