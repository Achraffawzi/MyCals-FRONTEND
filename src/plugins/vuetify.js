import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2f7fac",
        secondary: "#333333",
        third: "#777777",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
