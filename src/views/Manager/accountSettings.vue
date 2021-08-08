<template>
  <div class="account-settings mt-xm-0 mt-md-16">
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
        :rules="passwordRule"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Confirm New Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn class="primary white--text" text>Save</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "accountSettings",
  data() {
    return {
      currentPassword: "",
      show1: false,
      newPassword: "",
      confirmNewPassword: "",
      passwordRule: [
          (password) => password.length > 0 || "Password required"
      ]
    };
  },
};
</script>
