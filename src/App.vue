<template>
  <header-vue/>
  <router-view></router-view>
</template>

<script>
import HeaderVue from "@/components/HeaderVue.vue";


export default {
    components: {
    HeaderVue,
  },

  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
body::-webkit-scrollbar {
  display: none;
}
body {
  background-color: #0c111b;
  scroll-behavior: smooth;
}

.container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 16px;
  width: 100%;
}
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
}
.img-fluid {
  width: 100%;
  height: auto;
}
.relative {
  position: relative;
}
</style>
