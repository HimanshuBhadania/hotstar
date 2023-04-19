<template>
  <div class="bgimg relative">
    <img :src="src" alt="hello" class="img-fluid" />
    <div class="hoverimg">
      <img :src="hoverSrc" class="img-fluid" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["src", "hoverSrc"],
};
</script>
<style scoped>
.bgimg,
.bgimg img {
  height: inherit;
}
.bgimg:hover .hoverimg {
  display: block;
}
.hoverimg {
  display: none;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>