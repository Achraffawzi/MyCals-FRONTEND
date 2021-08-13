<template>
  <div class="dashboard">
    <!-- Error in Adding rating Snackbar -->
    <v-snackbar top v-model="snackbarRating">
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbarRating = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
          <v-list-item @click="handleSignout">
            <v-list-item-title @click="handleSignout"
              >Sign out</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" class="white--text elevation-10" app>
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
          <v-dialog v-model="Ratingdialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-icon>
                  <v-icon class="white--text">star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Rate us</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-card>
              <v-card-title class="text-h5 primary white--text">
                Share your success story
              </v-card-title>

              <v-card-text>
                <v-rating
                  v-model="newRating.Nbr_Stars"
                  value="newRating.Nbr_Stars"
                  color="primary"
                  hover
                  length="5"
                  size="25"
                ></v-rating>
                <v-form ref="opinionForm">
                  <v-text-field
                    v-model="newRating.Title"
                    label="Title"
                    :rules="titleRule"
                  >
                  </v-text-field>
                  <v-textarea
                    v-model="newRating.Text"
                    :rules="opinionRule"
                    label="Opinion"
                  ></v-textarea>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="close"> Cancel </v-btn>
                <v-btn
                  color="primary"
                  text
                  :loading="rateusLoading"
                  @click="handleRateApp()"
                >
                  Share
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <transition name="dashboardTransition" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints, IMAGE_URL } from "@/api.js";
export default {
  name: "UserDashboard",
  data() {
    return {
      // Bindings for the app bar component
      drawer: true,
      // Rating data
      Ratingdialog: false,
      newRating: {
        Title: "",
        Text: "",
        Nbr_Stars: 0,
      },
      rateusLoading: false,
      snackbarRating: false,
      errorMessage: "Operation failed, please verify your rating fields",
      userAvatarSrc: "",
      userNameAvatar: "",

      // Binding All links
      items: [
        { icon: "restaurant", title: "Meals", route: "/userDashboard/Meals" },
      ],
      accountRouteObj: [
        { title: "Settings", route: "/userSettings/userProfileSettings" },
      ],

      titleRule: [(value) => value.length > 0 || "Title is required"],

      // Rule for description length
      opinionRule: [
        (value) =>
          value.length >= 20 || "Opinion must be 20 characters or more",
      ],
    };
  },

  // Get the user avatar
  mounted() {
    this.getUserAvatar();
  },

  methods: {
    // Rating the app functionality
    handleRateApp() {
      if (this.$refs.opinionForm.validate() && this.newRating.Nbr_Stars > 0) {
        this.rateusLoading = true;
        createApiEndPoints(END_POINTS.ADD_REVIEW)
          .create({ ...this.newRating })
          .then((response) => {
            console.log(response);
            this.rateusLoading = false;
            this.Ratingdialog = false;
          })
          .catch((error) => console.log(error));
      } else {
        this.snackbarRating = true;
      }
    },

    close() {
      this.Ratingdialog = false;
      this.$refs.opinionForm.reset();
    },

    // Sign out
    handleSignout() {
      localStorage.removeItem("L_T");
      this.$router.push({ name: "Home" });
    },

    // Get User profile pic / Avatar
    getUserAvatar() {
      createApiEndPoints(END_POINTS.GET_USER_PROFILE)
        .fetch()
        .then((response) => {
          if (response.data.pictureUser != null) {
            this.userAvatarSrc = IMAGE_URL + "" + response.data.pictureUser;
            // Set the value of calories goal in the store
            this.$store.dispatch("setCaloriesGoal", response.data.calories_Goal);
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
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background: $dashboard-navigation-drawer-bg !important;

  .v-list .v-list-item--active {
    background-color: #2f7fac;
  }
}

.v-list--nav {
  padding-left: 0;
}

.time-picker {
  left: 50%;
  transform: translateX(-50%);
}
.dashboardTransition-enter-active {
  animation: route-enter 0.56s;
  opacity: 0;
  animation-delay: 0.1s;
}

.dashboardTransition-leave-active {
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
