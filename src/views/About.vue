<template>
  <div class="about">
    <Navbar />
    <Banner />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/about/Banner.vue";
export default {
  name: "About",
  components: {
    Navbar,
    Banner,
  },
};
</script>
