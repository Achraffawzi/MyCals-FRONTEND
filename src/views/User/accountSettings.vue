<template>
  <div class="account-settings mt-xm-0 mt-md-16">
    <v-alert
      v-model="alert"
      dismissible
      :color="setColorState"
      border="left"
      elevation="2"
      colored-border
      :icon="setIconState"
    >
      {{ alertMessage }}
    </v-alert>
    <h5 class="text-h5 font-weight-bold">Change password</h5>
    <v-form ref="accountSettingsForm">
      <v-text-field
        v-model="currentPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRule"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Current Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-text-field
        v-model="newPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRule"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="New Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-text-field
        v-model="confirmNewPassword"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="confirmPasswordRule"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Confirm New Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        class="primary white--text"
        text
        @click="handleChangePassword"
        :loading="loading"
      >
        Save
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints } from "@/api.js";
export default {
  name: "userAccountSettings",
  data() {
    return {
      setColorState: "",
      setIconState: "",
      currentPassword: "",
      loader: null,
      loading: false,
      show1: false,
      newPassword: "",
      alertMessage: "",
      confirmNewPassword: "",
      passwordRule: [(password) => password.length > 0 || "Password required"],
      confirmPasswordRule: [
        (password) => password == this.newPassword || "Password not match",
      ],
      alert: false,
    };
  },

  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

  methods: {
    // handle change password
    handleChangePassword() {
      if (this.$refs.accountSettingsForm.validate()) {
        this.loading = true;
        this.alert = true;
        let passwordSettings = {
          CurrentPassword: this.currentPassword,
          NewPassword: this.newPassword,
          ConfirmNewPassword: this.confirmNewPassword,
        };
        createApiEndPoints(END_POINTS.CHANGE_PASSWORD)
          .update(passwordSettings)
          .then((response) => {
            if(response.status === 200){

              this.alertMessage = response.data;
              this.setColorState = "success";
              this.setIconState = "done";

            }
          })
          .catch(() => {
            this.alertMessage = "Current password incorrect";
            this.setColorState = "error";
            this.setIconState = "priority_high";
          });

          this.loading = false;
          this.$refs.accountSettingsForm.reset();
      } else {
        this.alert = true;
        this.alertMessage = "Please verify your information";
      }
    },
  },
};
</script>
