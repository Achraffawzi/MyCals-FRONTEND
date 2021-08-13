<template>
  <footer class="white--secondary pt-5">
    <v-container>
      <v-row wrap>
        <v-col cols="12" sm="12" md="6">
          <div class="footer__icons footer__address mb-4">
            <v-icon class="secondary--text mr-3">place</v-icon>
            <span class="font-weight-light"
              >21 Revolution street
              <span class="font-weight-bold">Agadir, Morocco</span></span
            >
          </div>
          <div class="footer__icons footer__phone mb-4">
            <v-icon class="secondary--text mr-3">phone</v-icon>
            <span class="font-weight-light">+212655555555</span>
          </div>
          <div class="footer__icons footer__address mb-4">
            <v-icon class="secondary--text mr-3">email</v-icon>
            <span class="font-weight-light">support@company.com</span>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <h2 class="font-weight-bold mb-3">About MyCals</h2>
          <p class="font-weight-light">
            Welcome to MyCals, your number one source for all things nutrition.
            We're dedicated to providing you the very best of our services that
            will help you achieve your goals, with an emphasis on learning,
            tracking and improving your nutrition and eating habits.
          </p>
        </v-col>
      </v-row>
      <!-- copyright -->
      <p class="text-center mt-5">
        All rights reserved to MyCals company &copy; {{ getCurrentYear }}
      </p>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: #eaedf1;
}
</style>
