<template>
  <div class="unauthorized">
    <v-container>
      <v-img
        class="mx-auto"
        max-width="600"
        max-height="500"
        src="../assets/unauthorized.svg"
      ></v-img>
      <h4 class="text-h4 primary--text font-weight-bold text-center">
        No Authorization found.
      </h4>
      <p class="third--text text-center">
        This page is not publically available.
      </p>
      <p class="third--text text-center">To access it, please login first.</p>
      <div class="text-center py-5">
        <v-btn link depressed text to="/Login" class="white--text primary"
          >Login</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style lang="scss" scoped></style>
