<template>
  <div class="auth-email-confirmation">
    <v-container>
      <v-responsive>
        <v-img
          src="../assets/mailbox.svg"
          max-width="550"
          class="mx-auto"
        ></v-img>
      </v-responsive>
      <p class="third--text text-center py-4">{{ confirmationMessage }}</p>
      <div class="text-center" v-if="confirmationMessage !== 'not confirmed'">
        <v-btn class="primary white--text" link :to="{ name: 'Login' }"
          >Go To Login Page</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints } from "@/api.js";
export default {
  name: "AuthMailConfirmation",
  data() {
    return {
      confirmationMessage: "",
    };
  },

  mounted() {
    // Get the token and user ID
    let url = window.location.href;
    console.log(url);
    let queryString = url.split("?")[1];
    let paramOne = queryString.split("&")[0].split("=")[1];
    let paramTwo = queryString.split("&")[1].split("=")[1];
    let params = {
      userId: paramOne,
      token: paramTwo,
    };

    createApiEndPoints(END_POINTS.AUTH_CONFIRM_EMAIL)
      .create({ ...params })
      .then((response) => {
        this.confirmationMessage = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
