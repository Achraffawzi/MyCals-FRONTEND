<template>
  <div class="about">
    <Navbar />
    <Banner />
    <Features />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/about/Banner.vue";
import Features from "@/components/about/Features.vue";
export default {
  name: "About",
  components: {
    Navbar,
    Banner,
    Features,
  },
};
</script>
