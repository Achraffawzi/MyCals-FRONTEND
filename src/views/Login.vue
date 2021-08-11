<template>
  <div class="login">
    <!-- Error in Login Snackbar -->
    <v-snackbar top v-model="loginSnackbar">
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="loginSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <Navbar />
    <!-- Alert forget password -->
    <v-container>
      <v-alert
      v-model="alert"
      dismissible
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="info"
    >
      {{ alertMessage }}
    </v-alert>
    </v-container>
    <v-container>
      <h2 class="primary--text text-center">Log in</h2>
      <v-form
        ref="loginForm"
        @submit.prevent="handleLogin"
        class="d-block mx-auto"
        style="max-width: 400px"
      >
        <v-text-field
          label="Email"
          v-model="loggedinUser.Email"
          prepend-icon="email"
          :rules="emailRule"
        ></v-text-field>
        <v-text-field
          v-model="loggedinUser.Password"
          prepend-icon="lock"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRule"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <span  @click="dialog = true;" class="font-weight-bold d-block primary--text" v-bind="attrs" v-on="on"
          >Forgot password?</span>
          </template>

          <v-card>
            <v-card-title class="text-h5 text-center d-block primary--text">
              Forgot password
            </v-card-title>

            <v-card-text>
              <v-text-field label="Email" v-model="email" prepend-icon="email" :rules="emailRule"></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed text class="primary white--text" @click="handleForgetPassword">
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          :loading="loginButtonLoading"
          @click="handleLogin"
          >Log in</v-btn
        >
        <p class="text-center">
          Don't have an account?
          <router-link to="/Signup" class="font-weight-bold primary--text"
            >Sign up</router-link
          >
        </p>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { END_POINTS, createApiEndPoints } from "@/api.js";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      loginSnackbar: false,
      email: "",
      alert: false,
      alertMessage: "",
      errorMessage: "Login failed, please verify your information",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      dialog: false,
      loggedinUser: {
        Email: "",
        Password: "",
      },
      emailRule: [
        function (email) {
          let emailRegex = new RegExp(
            "^[a-zA-Z0-9]+((.|_|-)[a-zA-Z0-9]+)?@[a-zA-Z]+.(com|fr|uk|net)$"
          );
          if (!emailRegex.test(email)) {
            return "please enter a valid email adresse";
          }
        },
      ],
      passwordRule: [
        (password) =>
          password.length >= 8 || "Password must have at least 8 characters",
      ],
      loginButtonLoading: false,
    };
  },

  computed: {
    getCredentials() {
      return this.$store.state.currentToken;
    },
  },

  methods: {
    handleLogin() {
      this.loginButtonLoading = true;
      if (this.$refs.loginForm.validate()) {
        createApiEndPoints(END_POINTS.AUTH_LOGIN)
          .create({ ...this.loggedinUser })
          .then((response) => {
            this.loginButtonLoading = false;
            // Get the token
            if (response.status === 200) {
              localStorage.setItem("L_T", response.data.userDisplay.token);
              // Get the current logged in user role to redirect to the right dashboard
              if (response.data.userDisplay.role == "User") {
                this.$router.push({ name: "UserDashboardMeals" }, () => {
                  location.reload();
                });
              } else if (response.data.userDisplay.role == "Manager") {
                this.$router.push({ name: "managerDashboard" }, () => {
                  location.reload();
                });
              } else if (response.data.userDisplay.role == "Admin") {
                this.$router.push({ name: "AdminDashboardAppStats" }, () => {
                  location.reload();
                });
              }
            }
          })
          .catch(() => {
            this.loginButtonLoading = false;
            this.loginSnackbar = true;
          });
      } else {
        this.loginButtonLoading = false;
        this.loginSnackbar = true;
      }
    },
    handleForgetPassword() {
      this.alert = true;
      createApiEndPoints(END_POINTS.AUTH_FORGET_PASSWORD)
        .create({ email: this.email })
        .then(response => {
          this.alertMessage = response.data;
        })
        .catch(error => console.log(error))

      this.dialog = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 4rem;
}
</style>
