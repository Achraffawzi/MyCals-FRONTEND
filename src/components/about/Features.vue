<template>
  <div class="features py-10">
    <v-container>
      <v-row
        v-for="feature in features"
        :key="feature.title"
        class="features-row"
      >
        <v-col
          cols="12"
          md="4"
          :order="feature.order"
          :class="[
            feature.order == 'last' ? 'offset-0' : 'offset-sm-0 offset-md-2',
          ]"
        >
          <h4 class="text-h4 font-weight-bold">{{ feature.title }}</h4>
          <p>{{ feature.description }}</p>
        </v-col>
        <v-col
          cols="12"
          md="4"
          :class="[feature.order == 'last' ? 'offset-md-2' : '']"
        >
          <v-responsive>
            <v-img class="mx-auto" :src="feature.image"></v-img>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Features",
  data() {
    return {
      features: [
        {
          image: "../../assets/about-learn.svg",
          title: "Learn",
          description:
            "Learn about the essential of diets and nuitrition and how it keeps you healthy and in a good shape",
          order: "first",
        },
        {
          image: "../../assets/about-track.svg",
          title: "Track",
          description:
            "Track calories, height, weight  and nutrition in very easy steps",
          order: "last",
        },
        {
          image: "../../assets/about-improve.svg",
          title: "Improve",
          description:
            "Get your body to be in shape and healthy and increase your likelihood of hitting your goals.",
          order: "first",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.features-row {
  margin-bottom: 120px;
}
</style>
