<template>
  <div class="signup">
    <!-- Error in signup snackbar -->
    <v-snackbar top v-model="snackbarSignupError">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbarSignupError = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

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

    <Navbar />
    <v-container>
      <v-alert
      v-model="alert"
      dismissible
      :color="setColorState"
      border="left"
      elevation="2"
      colored-border
      icon="setIconState"
    >
      {{ alertMessage }}
    </v-alert>
      <h2 class="primary--text text-center">Sign Up</h2>
      <v-form
        @submit.prevent="handleSignup"
        method="POST"
        class="d-block mx-auto"
        style="max-width: 400px"
        ref="form"
      >
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Firstname"
              v-model="newUser.FirstName"
              prepend-icon="badge"
              :rules="name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Lastname"
              v-model="newUser.LastName"
              prepend-icon="badge"
              :rules="name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <!-- Date picker menu -->
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="newUser.Date_Of_Birth"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(newUser.Date_Of_Birth)"
                  v-on="on"
                  :rules="dateRule"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newUser.Date_Of_Birth"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="items"
              label="Gender"
              :rules="genderRule"
              v-model="newUser.Gender"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Email"
              v-model="newUser.Email"
              prepend-icon="email"
              :rules="emailRule"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Password"
              v-model="newUser.Password"
              prepend-icon="lock"
              :rules="passwordRule"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Confirm password"
              prepend-icon="lock"
              v-model="newUser.ConfirmPassword"
              :rules="confirmPasswordRule"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          depressed
          class="primary my-4 text-capitalize"
          block
          @click="handleSignup"
          :loading="signupButtonLoading"
          >Sign up</v-btn
        >
        <p class="text-center">
          Already have an account?
          <router-link to="/Login" class="font-weight-bold primary--text"
            >Log in</router-link
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
  name: "Signup",
  components: {
    Navbar,
  },
  data(vm) {
    return {
      snackbarSignupError: false,
      alert: false,
      errorMessage:
        "Registration failed. Please double check your information!",
        alertMessage: "We have sent you a verification link  to your email account",
      newUser: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Gender: "Male",
        ConfirmPassword: "",
        Date_Of_Birth: "",
        Role: "User",
      },
      signupButtonLoading: false,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: vm.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      menu1: false,
      menu2: false,

      show1: false,


      emailRule: [
        function (email) {
          let emailRegex = new RegExp(
            "^[a-zA-Z0-9]+((.|_|-)[a-zA-Z0-9]+)?@(gmail|yahoo|hotmail).(com|fr|uk|net)$"
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
      name: [
        function (name) {
          let nameRegex = new RegExp("^[a-zA-Z]+([ a-zA-Z]+)?$");
          if (!nameRegex.test(name)) {
            return "The name must contain characters only";
          }
        },
      ],
      dateRule: [(date) => date.length > 0 || "Date of birth is required"],
      confirmPasswordRule: [
        (password) => password == this.newUser.Password || "Password not match",
      ],
      genderRule: [
        (gender) => gender.length >= 0 || "Please select your gender",
      ],
      items: ["Male", "Female"],
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    handleSignup() {
      this.signupButtonLoading = true;
      if (this.$refs.form.validate()) {
        createApiEndPoints(END_POINTS.AUTH_REGISTER)
          .create({ ...this.newUser })
          .then(() => {
            this.signupButtonLoading = false;
            // this.$router.push({ name: "Login" });
            this.alert = true;
          })
          .catch((error) => console.log(error));
      } else {
        this.signupButtonLoading = false;
        this.snackbarSignupError = true;
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 4rem;
}
</style>
