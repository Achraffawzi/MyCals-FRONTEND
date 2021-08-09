<template>
  <div class="users">
    <!-- deleting user Snackbar -->
    <v-snackbar top v-model="snacbarDelete">
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snacbarDelete = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
import { END_POINTS, createApiEndPoints } from "@/api.js";
export default {
  name: "Users",
  data() {
    return {
      snacbarDelete: false,
      errorMessage: "",

      searchingUser: "",
      dialog: false,
      dialogDelete: false,
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
        date_Of_Birth: "",
        weight: 0,
        height: 0,
      },
      defaultItem: {
        id: 0,
        firstName: "",
        lastName: "",
        date_Of_Birth: "",
        weight: 0,
        height: 0,
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

  // Get all users API
  mounted() {
    this.handleFetchUsers();
  },

  methods: {

    handleFetchUsers() {
      createApiEndPoints(END_POINTS.GET_USERS)
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
      createApiEndPoints(END_POINTS.DELETE_MANAGER_USER + "" + this.editedItem.id)
        .delete()
        .then(response => {
          this.snacbarDelete = true;
          this.errorMessage = response.data;
        })
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
  },
};
</script>
