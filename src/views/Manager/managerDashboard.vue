<template>
  <div class="managerDashboard">
    <v-app-bar app>
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
          <v-list-item link @click="handleSignout">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-container>
      <!-- Searching for a user -->
      <v-row>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            label="Search by name"
            prepend-icon="search"
            v-model="searchingUser"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <!-- Table data -->
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        sort-by="Lastname"
        class="elevation-1"
        :search="searchingUser"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Delete</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints, IMAGE_URL } from "@/api.js";
export default {
  name: "managerDashboard",
  data() {
    return {
      accountRouteObj: [
        { title: "Settings", route: "/managerSettings" },
      ],
      searchingUser: "",
      dialog: false,
      dialogDelete: false,
      userAvatarSrc: "",
      userNameAvatar: "",
      headers: [
        {
          text: "Firstname",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Lastname", value: "lastName" },
        { text: "date of birth", value: "date_Of_Birth", sortable: false },
        { text: "Height", value: "height", sortable: false },
        { text: "Weight (g)", value: "weight", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        firstName: "",
        lastName: "",
        gender: "",
        date_Of_Birth: "",
        email: "",
        userName: "",
        role: "User",
        weight: 0,
        height: 0,
        calories_Goal: 0,
      },
      defaultItem: {
        id: 0,
        firstName: "",
        lastName: "",
        gender: "",
        date_Of_Birth: "",
        email: "",
        userName: "",
        role: "User",
        weight: 0,
        height: 0,
        calories_Goal: 0,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  
  mounted() {
    this.handleFetchUsers(); // Get all users API
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
    
    handleFetchUsers() {
      createApiEndPoints(END_POINTS.GET_USERS_MANAGER)
      .fetch()
      .then(response => {
        response.data.forEach(user => {
          user.date_Of_Birth = user.date_Of_Birth.split('T')[0];
        })
        this.users = [...response.data]
      })
      .catch(error => console.log(error));
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      // API
      createApiEndPoints(END_POINTS.DELETE_USER_MANAGER + "" + this.editedItem.id)
        .delete()
        .then(response => console.log(response))
        .catch(error => console.log(error));

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    handleSignout() {
      localStorage.removeItem('L_T');
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
