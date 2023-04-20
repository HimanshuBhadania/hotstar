<template>
  <div>
    <div v-show="loading" class="skeleton">
      <div></div>
    </div>
    <div v-show="!loading" class="movieWrapper">
      <div class="movieDetails">
        <div class="name">{{ movie?.jawSummary?.title }}</div>
        <div class="description">
          {{ movie?.jawSummary?.synopsis?.slice(0, 40) }}
        </div>
        <div class="btns">
          <button @click="playMovieHandle" class="play-btn btn">PLay</button>
          <span v-if="!isInFavList" @click="handleAddToFav" class="addToFav">&#43;</span>
          <span v-if="isInFavList" @click="handleRemoveToFav" class="removeFavlist"> &#10084;</span>
        </div>
      </div>

      <div class="player">
        <div class="ActivemovieVideo">
          <video autoplay class="img-fluid" muted>
            <source src="../assets/video.mp4" type="video/mp4" />
          </video>
        </div>
        <img :src="movie?.jawSummary?.backgroundImage?.url" alt="" class="img-fluid" @load="isImgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
export default {
  props: ["movie"],
  data() {
    return {
      loading: true,
      favList: [],
      isInFavList: false,
    };
  },
  mounted() {
    if (this.$cookies.get("favlist") && this.$cookies.get("favlist") > 0) {
      this.favList = this.$cookies.get("favlist");
      this.isInFavList = this.favList?.includes(this.movie?.jawSummary?.title)
    }
    else { this.favList = [] }

  },
  methods: {
    handleAddToFav() {
      if (!this.favList?.includes(this.movie?.jawSummary?.title)) {
        this.favList?.push(this.movie?.jawSummary?.title)
        this.$cookies.set("favlist", this.favList)
      }
    },
    handleRemoveToFav() {
      if (this.favList?.includes(this.movie?.jawSummary?.title)) {
        this.favList = this.favList.filter(name => name != this.movie?.jawSummary?.title)
        this.$cookies.set("favlist", this.favList)
        this.$emit("isInFavList", this.movie?.jawSummary?.title)
      }
    },
    playMovieHandle(e) {
      const movieName =
        e.target.parentElement.parentElement.children[0].innerText;
      this.$router.push(`/movie/${movieName}`);
    },
    isImgLoad() {
      this.loading = false;
    },
  },
  watch: {
    favList: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.favList = this.$cookies.get("favlist")
          this.isInFavList = this.favList?.includes(this.movie?.jawSummary?.title)
        }, 1)
      }
    }

  }
};
</script>
<style scoped>
.skeleton {
  display: inline-block;
  height: inherit;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;
  width: 100%;
  border-radius: 6px;
}

.skeleton>div {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 100%;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.5) 20%,
      rgba(255, 255, 255, 1) 60%,
      rgba(255, 255, 255, 0));
  animation: animation ease-in 2s infinite;
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
  height: inherit;
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
  font-size: 140%;
  font-weight: 600;
  margin-top: 15%;
  padding-left: 9%;
}

.description {
  font-size: 15px;
  margin-top: 10%;
  padding: 0 9%;
}

.btns {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5),
      rgba(255, 255, 255, 0.6));
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

.btns .addToFav {
  font-size: 35px;
  border-radius: 50%;
}

.btns .removeFavlist {
  font-size: 150%;
  border-radius: 50%;
}

.btns span:hover {
  background: -webkit-linear-gradient(white, rgb(255, 0, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animation {
  100% {
    transform: translateX(100%);
  }
}
</style>
