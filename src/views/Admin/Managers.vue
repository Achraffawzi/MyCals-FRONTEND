<template>
  <div class="managers">
    <!-- Error in adding a new manager Snackbar -->
    <v-snackbar top v-model="snacbarAdd">
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snacbarAdd = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-container>
      <!-- Searching for a user -->
      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            label="Search by name"
            prepend-icon="search"
            v-model="searchingUser"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4" class="d-flex">
          <v-dialog
            v-model="dialogAdd"
            width="500"
            class="d-inline-block ml-auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" class="ml-auto">
                New Manager
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 primary white--text">
                New Manager
              </v-card-title>

              <v-card-text>
                <v-form ref="formAdd">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="FirstName"
                        v-model="newManager.FirstName"
                        :rules="nameRule"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="LastName"
                        v-model="newManager.LastName"
                        :rules="nameRule"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        :items="genders"
                        label="Gender"
                        v-model="newManager.Gender"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="newManager.Date_Of_Birth"
                            prepend-icon="mdi-calendar"
                            label="Date of birth"
                            v-bind="attrs"
                            v-on="on"
                            :rules="dobRule"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="newManager.Date_Of_Birth"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newManager.Email"
                        :rules="emailRule"
                        label="Email"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Password"
                        v-model="newManager.Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                        :rules="passwordRule"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        label="Password"
                        v-model="newManager.ConfirmPassword"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-1"
                        hint="At least 8 characters"
                        counter
                        @click:append="show2 = !show2"
                        :rules="ConfirmpasswordRule"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  :loading="loadingAdd"
                  @click="handleAddManager"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <!-- Table data -->
    <v-container>
      <v-data-table
        :headers="headers"
        :items="managers"
        sort-by="LastName"
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
  name: "Managers",
  data() {
    return {
      snacbarAdd: false,
      errorMessage: "",

      searchingUser: "",
      dialogAdd: false,
      loadingAdd: false,
      loader: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "FirstName",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "LastName", value: "lastName", sortable: true },
        { text: "Email", value: "email", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      managers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Gender: "",
        ConfirmPassword: "",
        Date_Of_Birth: "",
        Role: "",
      },
      defaultItem: {
        id: 0,
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Gender: "",
        ConfirmPassword: "",
        Date_Of_Birth: "",
        Role: "",
      },
      newManager: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Gender: "Male",
        ConfirmPassword: "",
        Date_Of_Birth: "",
        Role: "Manager",
      },
      show1: false,
      show2: false,
      genders: ["Male", "Female"],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,

      // input Rules
      nameRule: [
        function (name) {
          let nameRegex = new RegExp("^[a-zA-Z]+([ a-zA-Z]+)?$");
          if (!nameRegex.test(name)) {
            return "The name must contain characters only";
          }
          return true;
        },
      ],

      dobRule: [(dob) => dob.length > 0 || "Please verify the date of birth"],
      emailRule: [
        function (email) {
          let emailRegex = new RegExp(
            "^[a-zA-Z0-9]+((.|_|-)[a-zA-Z0-9]+)?@[a-zA-Z]+.(com|fr|uk|net)$"
          );
          if (!emailRegex.test(email)) {
            return "please enter a valid email adresse";
          }
          return true;
        },
      ],
      passwordRule: [
        (password) =>
          password.length >= 8 ||
          "Password should be at least 8 characters (numbers, letters and symbols)",
      ],
      ConfirmpasswordRule: [
        (password) =>
          password == this.newManager.Password || "Password not match",
      ],
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
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  mounted() {
    this.handleFetchManagers();
  },

  methods: {
    handleFetchManagers() {
      createApiEndPoints(END_POINTS.GET_MANAGERS)
        .fetch()
        .then((response) => {
          this.managers = [...response.data];
        })
        .catch((error) => console.log(error));
    },

    handleAddManager() {
      this.loadingAdd = true;
      if (this.$refs.formAdd.validate()) {
        createApiEndPoints(END_POINTS.ADD_MANAGER)
          .create({ ...this.newManager })
          .then((response) => {
            let addedManager = {
              firstName: this.newManager.FirstName,
              lastName: this.newManager.LastName,
              email: this.newManager.Email,
            };
            this.managers.push(addedManager);
            this.snacbarAdd = true;
            this.errorMessage = response.data;

            setTimeout(() => {location.reload()}, 1500);
          })
          .catch((error) => console.log(error));
      } else {
        this.snacbarAdd = true;
        this.errorMessage = "Process failed, please verify form information";
      }
      this.loadingAdd = false;
      this.dialogAdd = false;
      this.$refs.formAdd.reset();
    },

    deleteItem(item) {
      this.editedIndex = this.managers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.managers.splice(this.editedIndex, 1);
      // API
      createApiEndPoints(
        END_POINTS.DELETE_MANAGER_USER + "" + this.editedItem.id
      )
        .delete()
        .then(() => {
          this.snacbarAdd = true;
          this.errorMessage = "Manager has been deleted successfully";
        })
        .catch((error) => console.log(error));
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
