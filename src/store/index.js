import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentToken: "",
    calories_goal: 0,
  },
  mutations: {
    getUserToken: (state, token) => {
      state.currentToken = token;
    },
    setCaloriesGoal: (state, calories_goal) => {
      state.calories_goal = calories_goal;
    }
  },
  actions: {
    getUserToken: (context, token) => {
      context.commit("getUserToken", token);
    },
    setCaloriesGoal: (context, calories_goal) => {
      context.commit("setCaloriesGoal", calories_goal);
    }
  },
  modules: {},
});
