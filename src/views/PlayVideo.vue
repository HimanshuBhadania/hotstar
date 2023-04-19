<template>
  <div class="MovieWrapper">
    <div class="relative videoWrapper">
      <h2>
        {{ $route.params.movieName }}
      </h2>
      <video class="videoPlayer" controls muted autoplay>
        <source src="../assets/video.mp4" type="video/mp4" />
      </video>
      <button @click="handleBackPage" class="btn back-btn">&larr;</button>
    </div>
    <div class="recommended">
      <SliderVue :list="RecommendedMovies" title="Recommended For You" />
    </div>
  </div>
</template>

<script>
import { RecommendedMovie } from "../data";
import SliderVue from "../components/SilderVue.vue";
import { firebaseAuth } from "@/data/fireBase.config";
import { onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    SliderVue,
  },
  data() {
    return { RecommendedMovieData: RecommendedMovie };
  },
  computed: {
    RecommendedMovies() {
      return this.$store.state.movieList.titles;
    },
  },
  beforeMount() {
    window.scrollTo(0, 0);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    handleBackPage() {
      this.$router.go("-1");
    },
  },
};
</script>

<style scoped>
.MovieWrapper {
  margin-top: 78px;
}
.MovieWrapper h2 {
  position: absolute;
  color: whitesmoke;
  right: 8%;
  top: 2%;
}
.back-btn {
  position: absolute;
  background: transparent;
  color: white;
  font-size: 50px;
  left: 8%;
  top: 0%;
  padding: 0;
  display: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.videoWrapper:hover .back-btn {
  display: block;
}
.videoPlayer {
  width: 100%;
  height: calc(100vh - 82px);
}
.recommended {
  position: relative;
}
</style>