<template>
  <div class="testimonial-card" v-if="reviews.length > 0">
    <carousel
      :autoplay="false"
      :nav="false"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 1, nav: false },
      }"
    >
      <v-card
        outlined
        max-width="600"
        class="mx-auto testimonial__card"
        v-for="review in reviews"
        :key="review.id"
      >
        <v-row wrap class="align-items-stretch">
          <v-col cols="12" sm="12" md="4">
            <!-- current logged in User avatar -->
            <v-avatar tile v-if="review.picture != null">
              <img
                style="width: 100%; height: 100%;"
                tile
                :src="review.picture"
              />
            </v-avatar>
            <v-avatar style="width: 100%; height: 100%;" tile v-else color="primary">
              <span class="white--text text-h3">{{ getUserNameAvatar }}</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="12" md="8" class="quote-icon">
            <v-card-title class="font-weight-bold">
              {{ review.title }}
            </v-card-title>
            <v-card-text>
              <p>{{ review.text }}</p>
              <h3 class="primary--text font-weight-bold">
                {{ review.nameOfAuthor }}
              </h3>
              <v-rating
                v-model="review.nbr_Stars"
                color="primary"
                hover
                length="5"
                readonly
                size="25"
              ></v-rating>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </carousel>
  </div>
</template>

<script>
import { END_POINTS, createApiEndPoints } from "@/api.js";
import carousel from "vue-owl-carousel";
export default {
  name: "TestimonialCard",
  data() {
    return {
      userAvatarSrc: "",
      getUserNameAvatar: "",
      rating: 4,
      reviews: [],
    };
  },
  components: {
    carousel,
  },

  mounted() {
    this.handleFetchReviews();
  },

  methods: {
    handleFetchReviews() {
      createApiEndPoints(END_POINTS.GET_REVIEWS)
        .fetch()
        .then((response) => {
          this.reviews = [...response.data];
          this.reviews.forEach((review) => {
            if (review.picture == null)
              this.getUserNameAvatar =
                review.nameOfAuthor.split(" ")[0].charAt(0).toUpperCase() +
                "" +
                review.nameOfAuthor.split(" ")[1].charAt(0).toUpperCase();
          });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.testimonial__card {
  position: relative;

  .quote-icon:after {
    contain: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: red;
  }
}
.testimonial__img {
  height: 240px;
  object-fit: contain;
}

@media screen and (max-width: 959px) {
  .v-avatar { height: 200px !important }
}
</style>
