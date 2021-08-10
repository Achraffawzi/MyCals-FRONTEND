<template>
  <div class="about">
    <Navbar />
    <Banner />
    <Features />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/about/Banner.vue";
import Features from "@/components/about/Features.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "About",
  components: {
    Navbar,
    Banner,
    Features,
    Footer,
  },

  beforeRouteEnter(to, from, next) {
    // Check if there is a token
    let l_t = localStorage.getItem("L_T");
    if (l_t != null) {
      // Convert the JWT To Object
      var base64Url = l_t.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      let tokenObj = JSON.parse(jsonPayload);
      // Get the role
      switch (tokenObj.role) {
        case "User":
          next("/UserDashboard/Meals");
          break;
        case "Manager":
          next("/managerDashboard");
          break;
        case "Admin":
          next("/AdminDashboard/Users");
          break;
        default:
          next();
      }
    } else {
      next();
    }
  },
};
</script>
