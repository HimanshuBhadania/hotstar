<template>
  <LoderVue
    v-if="!kidsMovies || !RecommendedMovies || !ComadyMovies || !ActionMovies"
  />
  <template v-else>
    <div class="home_Section">
      <div class="activeMovieImg">
        <div class="realtive bgImg">
          <img :src="activeHeroSction?.bg" alt="logo" class="img-fluid" />
        </div>
      </div>

      <div class="container relative movieDetails">
        <div class="title">{{ activeHeroSction?.movieName }}</div>
        <div class="description">{{ activeHeroSction?.description }}</div>
        <button class="btn play-btn" @click="playVideoHandle">Watch Now</button>
      </div>

      <div class="categories">
        <div
          v-for="trendingMovie in trendingMovies"
          :key="trendingMovie.id"
          class="category_wrapper"
          @click="handleBgImg"
        >
          <HeroCard
            :src="trendingMovie.logo"
            :hoverSrc="trendingMovie.hoverimg"
          />
        </div>
      </div>
    </div>
    <div class="recommended">
      <SliderVue :list="RecommendedMovies" title="Recommended For You" />
    </div>
    <div class="recommended">
      <SliderVue :list="ComadyMovies" title="Comady" />
    </div>
    <div class="recommended">
      <SliderVue :list="kidsMovies" title="Kids" />
    </div>
    <div class="recommended">
      <SliderVue :list="ActionMovies" title="Action" />
    </div>
  </template>
</template>


<script>
import { RecommendedMovie } from "@/data";
import SliderVue from "../components/SilderVue.vue";
import LoderVue from "@/components/LoderVue.vue";
import { firebaseAuth } from "@/data/fireBase.config";
import { onAuthStateChanged } from "firebase/auth";
import HeroCard from "@/components/heroCard.vue";
export default {
  components: {
    SliderVue,
    LoderVue,
    HeroCard,
  },
  data() {
    return {
      trendingMovies: RecommendedMovie,
      activeBgImg:
        "https://melbourne-symphony-orchestra.s3.amazonaws.com/production/Concert-pages/2023-concerts/2023-frozen-in-concert-1200x800.jpg?mtime=20221102163047",
      activeHeroSction: {},
    };
  },
  computed: {
    kidsMovies() {
      return this.$store.getters.kidsMovie;
    },
    ComadyMovies() {
      return this.$store.getters.ComadyMovie;
    },
    ActionMovies() {
      return this.$store.getters.ActionMovie;
    },
    RecommendedMovies() {
      return this.$store.state.movieList.titles;
    },
  },
  methods: {
    playVideoHandle(e) {
      const movieName = e.target.parentElement.children[0].innerText;
      this.$router.push(`/movie/${movieName}`);
    },
    handleBgImg(e) {
      this.activeBgImg = e.target.src;
    },
  },
  watch: {
    activeBgImg: {
      deep: true,
      handler(val) {
        this.activeHeroSction = this.trendingMovies.find(
          (movie) => movie.hoverimg == val
        );
        console.log(this.trendingMovies,val)
      },
      immediate: true,
    },
  },
  beforeMount() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        this.$router.push("/login");
      }
    });
  },
};
</script>

<style scoped>
.home_Section {
  margin-top: 78px;
  height: calc(100vh - 78px);
  display: flex;
  flex-direction: column;
  padding: 12px;
  position: relative;
}
.bgImg img {
  object-fit: cover;
}

.title {
  z-index: 2;
  color: whitesmoke;
  font-weight: 600;
  font-size: 72px;
  margin-top: 54px;
}
.description {
  z-index: 2;
  color: whitesmoke;
  max-width: 640px;
  font-size: 22px;
  margin-top: 32px;
}

.activeMovieImg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.activeMovieImg img {
  height: 100%;
}
.bgImg {
  height: 100%;
}
.bgImg:after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), #0c111b);
}
.categories {
  z-index: 2;
  display: flex;
  margin-top: auto;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
}
.movieDetails {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.category_wrapper {
  background-color: whitesmoke;
  flex: 1;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.play-btn {
  background-color: #a00;
  color: whitesmoke;
  font-weight: 600;
  font-size: 25px;
  padding: 12px 28px;
  cursor: pointer;
  margin-top: auto;
  width: 220px;
  margin-bottom: 80px;
  transition: all ease-in 0.25s;
}
.play-btn:hover {
  background-image: linear-gradient(#a00, rgba(0, 0, 0, 0.8));
}
.category_wrapper img {
  height: 100%;
  cursor: pointer;
  object-fit: cover;
  object-position: center;
}
.recommended {
  position: relative;
}
</style>


