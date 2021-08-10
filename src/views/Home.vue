<template>
  <div class="banner">
    <Navbar />
    <Banner />
    <!-- Why Us Section -->
    <section class="why-us text-center">
      <v-container>
        <h4 class="text-h4">Why MyCals?</h4>
        <WhyComponent />
        <v-btn
          depressed
          class="primary white--text font-weight-light banner__intro__button"
          link
          to="/Signup"
          >Start Your Journey Now
        </v-btn>
        <!-- <router-link class="primary white--text pa-2 rounded" to="/Signup">
          Start your journey now!
        </router-link> -->
      </v-container>
    </section>
    <!-- Testimonial -->
    <section class="testimonial">
      <v-container>
        <h4 class="text-h4 testimonial__title text-center mb-4">
          Successfull stories
        </h4>
        <p class="third--text testimonial__description text-center">
          Hundreds of users have reached their goals using myCals.
        </p>
        <p class="third--text testimonial__description text-center mb-15">
          don’t forget to share your journey too in order to inspire others!
        </p>
        <TestimonialCard />
      </v-container>
    </section>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "../components/Home/Banner.vue";
import WhyComponent from "../components/Home/WhyComponent.vue";
import TestimonialCard from "../components/Home/TestimonialCard.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",

  components: {
    Navbar,
    Banner,
    WhyComponent,
    TestimonialCard,
    Footer,
  },

  data() {
    return {
      token: localStorage.getItem("L_T"),
    };
  },

  methods: {
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
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

<style lang="scss" scoped>
.testimonial,
.why-us {
  margin: 100px 0;
}

// Why Us

// Testimonial
.testimonial {
  .testimonial__title {
    margin-bottom: 20px;
  }

  .testimonial__description:last-of-type {
    margin-bottom: 70px;
  }
}
</style>


