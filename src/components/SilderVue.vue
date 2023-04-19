<template>
  <div class="swiperWrapper">
    <div class="header_wrapper">
      <div class="title">{{ title }}</div>
      <div class="viewAll">
        <button @click="viewAllhandlePage">View All</button>
      </div>
    </div>
    <swiper
      :slidesPerView="8"
      :spaceBetween="20"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
      :loop="true"
      :lazy="true"
    >
      <swiper-slide v-for="movie in list?.slice(0, 20)" :key="movie.id">
        <CardVue :movie="movie" class="height"/>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import CardVue from "@/components/CardVue.vue"
import "swiper/css";
import "swiper/css/navigation";

export default {
  props: ["list", "title"],
  data() {
    return {
      modules: [Navigation],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    CardVue
  },
  methods: {
    playMovieHandle(e) {
      const movieName =
        e.target.parentElement.parentElement.children[0].innerText;
      this.$router.push(`/movie/${movieName}`);
    },
    viewAllhandlePage() {
      this.$router.push(`/list/${this.title}`);
    },
  },
  watch: {
    list: {
      deep: true,
    },
  },
};
</script>
<style scoped>
.height{
  height: 250px;
}
.title {
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}
.swiperWrapper {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
}
.ActivemovieVideo {
  position: absolute;
  top: -30px;
  left: -100%;
  right: -30%;
  width: 300%;
  display: none;
}

.movieWrapper:hover {
  transform: scale(1.05);
}
.movieWrapper:hover .ActivemovieVideo {
  display: block;
}

.header_wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
}

.viewAll button {
  background: transparent;
  border: none;
  outline: none;
  color: whitesmoke;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
}
.movieWrapper {
  color: black;
  background-color: white;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  height: 220px;
  position: relative;
}
.player {
  height: 100% !important;
}
.movieWrapper img {
  object-fit: cover;
  height: 100% !important;
}
.movieWrapper:hover .movieDetails {
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  transition: all ease-in-out 0.3s;
}
.movieWrapper .movieDetails {
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
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  padding-left: 10px;
}
.description {
  font-size: 15px;
  margin-top: 20px;
  padding-left: 10px;
}
.btns {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 10px;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(255, 255, 255, 0.6)
  );
}
.btns .play-btn {
  background: #a00;
  color: whitesmoke;
  font-weight: 600;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: auto;
}
.play-btn:hover {
  background-image: linear-gradient(#a00, rgba(0, 0, 0, 0.8));
}

.btns span {
  font-size: 35px;
  border-radius: 50%;
}
.btns span:hover {
  background: -webkit-linear-gradient(white, rgb(255, 0, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>