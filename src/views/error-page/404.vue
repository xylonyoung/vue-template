<template>
  <div class="page404">
    <img :src="require('@/assets/404/404.png')" />
    <div class="sorry">
      <p>咦~页面不见了~</p>
      <p>Oops~Page not found~</p>
    </div>
    <p class="goto"><a href="/">返回首页 Back to home</a></p>
  </div>
</template>

<script>
export default {
  name: 'Page404',
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #0b72a4;
}
.page404 {
  width: 100%;
  height: 6rem;
  position: absolute;
  margin: -3rem 0 0 -50%;
  top: 50%;
  left: 50%;
  text-align: center;
}
img {
  display: block;
  height: 4rem;
  margin: 0 auto 0.5rem;
}
.sorry {
  font-size: 0.45rem;
  line-height: 0.3rem;
}
.goto {
  font-size: 0.3rem;
  line-height: 0.68rem;
}
</style>
