<template>
  <div class="admin-dashboard">
    <v-app-bar app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="">My</span>
        <span class="primary--text">Cals</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- current logged in User avatar -->
          <v-avatar v-if="userAvatarSrc != ''">
            <img
              :src="userAvatarSrc"
              max-width="40"
              class="rounded-circle"
              style="cursor: pointer"
              v-bind="attrs"
              v-on="on"
            />
          </v-avatar>
          <v-avatar v-else color="primary">
            <span class="white--text text-h5" v-bind="attrs" v-on="on">{{
              userNameAvatar
            }}</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in accountRouteObj"
            :key="index"
            link
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <!-- Sign out link -->
          <v-list-item >
            <v-list-item-title @click="handleSignout">Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="primary white--text" app>
      <div
        class="
          subheading
          white--text
          text-center
          my-16
          dashboard__app-name dashboard-title
        "
      >
        MyCals
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
    </v-navigation-drawer>

    <router-view></router-view>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints, IMAGE_URL } from "@/api.js";
export default {
  name: "AdminDashboard",
  data() {
    return {
      // Bindings for the app bar component
      drawer: true,

      userAvatarSrc: "",
      userNameAvatar: "",

      // Binding All links
      items: [
        {
          icon: "equalizer",
          title: "Statistics",
          route: "/AdminDashboard/AppStats",
        },
        { icon: "groups", title: "Users", route: "/AdminDashboard/Users" },
        {
          icon: "group",
          title: "Managers",
          route: "/AdminDashboard/Managers",
        },
      ],
      accountRouteObj: [
        { title: "Settings", route: "/adminSettings" },
      ],
    };
  },
  
  mounted() {
    this.getUserAvatar(); // Get the user avatar
  },

  methods: {

    // Get User profile pic / Avatar
    getUserAvatar() {
      createApiEndPoints(END_POINTS.GET_USER_PROFILE)
        .fetch()
        .then((response) => {
          if (response.data.pictureUser != null) {
            this.userAvatarSrc = IMAGE_URL + "" + response.data.pictureUser;
          } else {
            // Set default avatar
            this.userNameAvatar =
              response.data.firstName.charAt(0).toUpperCase() +
              "" +
              response.data.lastName.charAt(0).toUpperCase();
          }
        })
        .catch((error) => console.log(error));
    },


    handleSignout() {
      localStorage.removeItem('L_T');
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
