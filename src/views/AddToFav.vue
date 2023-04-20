<template>
    <LoderVue v-if="loading" />
    <div class="container listWrapper">
        <h2 v-if="!favList || favList?.length == 0">Please Add Your Favourite Movies.</h2>
        <h2 v-else>My Favourite </h2>
        <div class="grid">
            <div v-for="movie in favList" :key="movie.id" class="movie_wrapper">
                <CardVue :movie="movie" class="height" @isInFavList="isInFavList" />
            </div>
        </div>
    </div>
</template>

<script>
import LoderVue from "@/components/LoderVue.vue";
import CardVue from "@/components/CardVue.vue";
export default {
    components: {
        LoderVue,
        CardVue,
    },
    data() {
        return {
            favList: [],
            loading: true,
        }
    },
    methods: {
        isInFavList() {
            this.loading = false
            this.favList = this.movieList?.titles?.filter((movie) => this.$cookies.get("favlist").includes(movie.jawSummary?.title));
            this.loading = false
        }
    },
    computed: {
        movieList() {
            return this.$store?.state?.movieList
        }
    },

    watch: {
        movieList: {
            deep: true,
            handler() {
                if (this.movieList.titles?.length > 0) {
                    this.favList = this.movieList?.titles?.filter((movie) => this.$cookies.get("favlist").includes(movie.jawSummary?.title));
                    this.loading = false
                }
            },
            immediate: true
        }
    }
}
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
</style>