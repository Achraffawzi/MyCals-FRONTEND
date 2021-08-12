<template>
  <div class="banner">
    <v-container class="d-flex flex-column align-center justify-center">
      <!-- Title -->
      <h2
        class="
          text-h2 text-center
          primary--text
          font-weight-bold
          text-uppercase
        "
      >
        About us
      </h2>
      <!-- Description -->
      <p class="text-center mt-8 font-weight-medium">
        Welcome to MyCals, your number one source for all things nutrition.
        We're dedicated to providing you the very best of our services that will
        help you achieve your goals, with an emphasis on learning, tracking and
        improving your nutrition and eating habits.
        <br />
        <br />
        Founded in 2021 by Achraf FAWZI and Jamal IDAISSA, MyCals has come a
        long way from its beginnings in Morocco. When MyCals's founders first
        started out, their passion for health and nutrition drove them to start
        their own business.
        <br />
        <br />
        We hope you enjoy our services as much as we enjoy offering them to
        you..
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style lang="scss" scoped>
.banner {
  color: #fff;
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../../assets/about-banner.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -20px;

  .container {
    height: 100%;
  }
}
</style>
