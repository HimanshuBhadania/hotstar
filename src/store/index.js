import { createStore } from "vuex";
import { Movies } from "@/API";
import axios from "axios";

export default createStore({
  state: {
    movieList: [],
    search: "",
  },
  mutations: {
    setData(state, res) {
      state.movieList = res;
    },
    searchData(state, res) {
      state.search = res;
    },
  },
  getters: {
    kidsMovie(state) {
      return state.movieList?.titles?.filter((movie) => {
        return movie.jawSummary.genres.map((type) =>
          type.name.includes("Kids")
        );
      });
    },
    ComadyMovie(state) {
      return state.movieList?.titles?.filter((movie) => {
        return movie.jawSummary.genres.map((type) =>
          type.name.includes("Comedies")
        );
      });
    },
    ActionMovie(state) {
      return state.movieList?.titles?.filter((movie) => {
        return movie.jawSummary.genres.map((type) =>
          type.name.includes("Action")
        );
      });
    },
  },
  actions: {
    async fatchMovieData({ commit }) {
      const response = await axios.request(Movies);
      if (response) {
        commit("setData", response.data);
      }
    },
    searchData({ commit }, value) {
      commit("searchData", value);
    },
  },
  modules: {},
});
