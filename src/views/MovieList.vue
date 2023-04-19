<template>
  <LoderVue v-if="!list" />
  <div class="container listWrapper">
    <h2>
      {{ $route.params.listId }}
    </h2>
    <div class="grid">
      <div v-for="movie in moviesList" :key="movie.id" class="movie_wrapper">
        <CardVue :movie="movie" class="height" />
      </div>
    </div>
  </div>
</template>

<script>
import LoderVue from "@/components/LoderVue.vue";
import { firebaseAuth } from "@/data/fireBase.config";
import { onAuthStateChanged } from "firebase/auth";
import CardVue from "@/components/CardVue.vue";

export default {
  components: {
    LoderVue,
    CardVue,
  },
  data() {
    return {
      moviesList: [],
    };
  },
  beforeMount() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        this.$router.push("/login");
      }
    });
  },
  computed: {
    list() {
      const list =
        this.$route.params.listId == "Comady"
          ? this.$store.getters.ComadyMovie
          : this.$route.params.listId == "Kids"
          ? this.$store.getters.kidsMovie
          : this.$route.params.listId == "Action"
          ? this.$store.getters.ActionMovie
          : this.$store.state.movieList.titles;
      return list;
    },
    search() {
      return this.$store.state.search;
    },
  },
  methods: {
    playVideoHandle(e) {
      const movieName =
        e.target.parentElement.parentElement.children[0].innerText;
      this.$router.push(`/movie/${movieName}`);
    },
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.moviesList = this.list;
      },
      immediate: true,
    },
    search: {
      deep: true,
      handler(val) {
        this.moviesList = this.list?.filter((movie) =>
          movie.jawSummary?.title.toLowerCase().includes(val.toLowerCase())
        );
      },
    },
  },
};
</script>

<style scoped>
.height {
  height: 350px;
}
.listWrapper {
  margin-top: 78px;
}
.listWrapper h2 {
  margin-top: 16px;
  color: whitesmoke;
}
.grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
}
.movie_wrapper {
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  height: 350px;
}
.ActivemovieVideo {
  position: absolute;
  top: -30px;
  left: -100%;
  right: -30%;
  width: 300%;
  display: none;
}

.movie_wrapper:hover .movieDetails {
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  transition: all ease-in 0.3s;
}
.movie_wrapper:hover .ActivemovieVideo {
  display: block;
}
.description {
  font-size: 16px;
  margin-top: 20px;
  padding-left: 24px;
}
.movieDetails {
  position: absolute;
  color: whitesmoke;
  left: 0;
  top: 100%;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}
.movieDetails .name {
  font-size: 24px;
  font-weight: 600;
  margin-top: 50px;
  padding-left: 24px;
}
.btns {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(255, 255, 255, 0.6)
  );
}
.bgImg {
  height: 100%;
}
.bgImg img {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.btns .play-btn {
  background: #a00;
  color: whitesmoke;
  font-weight: 600;
  font-size: 20px;
  padding: 12px 20px;
  cursor: pointer;
  margin-top: auto;
}
.play-btn:hover {
  background-image: linear-gradient(#a00, rgba(0, 0, 0, 0.8));
}

.btns span {
  font-size: 40px;
  border-radius: 50%;
}
.btns span:hover {
  background: -webkit-linear-gradient(white, rgb(255, 0, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>