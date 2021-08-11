<template>
  <div class="reset-password">
    <v-container>
      <h4 class="text-h4 primary-text">Reset Password</h4>
      <v-form ref="resetPasswordForm" style="max-width: 400px">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="New password"
              prepend-icon="lock"
              v-model="NewPassword"
              :rules="passwordRule"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Confirm New password"
              prepend-icon="lock"
              v-model="ConfirmNewPassword"
              :rules="confirmPasswordRule"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn depressed text class="primary white--text" @click="handleResetPassword"
              >Reset Password</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints } from "@/api.js";
export default {
  name: "ResetPassword",
  data() {
    return {
      NewPassword: "",
      ConfirmNewPassword: "",
      show1: false,
      show2: false,

      // Rules
      passwordRule: [
        (password) =>
          password.length >= 8 || "Password must have at least 8 characters",
      ],
      confirmPasswordRule: [
        (password) => password == this.NewPassword || "Password not match",
      ],
    };
  },

  methods: {
    handleResetPassword() {
      let url = window.location.href;
      let queryString = url.split("?")[1];
      let paramOne = queryString.split("&")[0].split("=")[1].replace("%40", "@");
      let paramTwo = queryString.split("&")[1].split("=")[1];
      let params = {
        email: paramOne,
        token: paramTwo,
        Password: this.NewPassword,
        ConfirmPassword: this.ConfirmNewPassword,
      };
      createApiEndPoints(END_POINTS.AUTH_RESET_PASSWORD)
        .update({ ...params })
        .then(response => {
          if(response.status === 200) this.$router.push({ name: "Login" });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
