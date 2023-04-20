import { createRouter, createWebHistory } from "vue-router";
// import { defineAsyncComponent } from "vue";
import HomePage from "../views/HomePage.vue";
import TvPage from "../views/TvPage.vue";
import MovieList from "../views/MovieList.vue";
import PlayVideo from "../views/PlayVideo.vue";
import LoginPage from "@/views/LoginPage.vue";
import AddToFav from "@/views/AddToFav.vue"
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/tv",
    name: "tv",
    component: TvPage,
  },
  {
    path: "/list/:listId",
    name: "List",
    component: MovieList,
  },
  {
    path: "/movie/:movieName",
    name: "movie",
    component: PlayVideo,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/favourite",
    name: "Favourite",
    component: AddToFav,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
