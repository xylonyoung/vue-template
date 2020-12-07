<template>
  <div class="layout-container">
    <header><navbar /></header>
    <main>
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </main>
    <footer>
      <nav-footer />
    </footer>
  </div>
</template>
<script>
import Navbar from './components/navbar'
import NavFooter from './components/footer'
export default {
  name: 'Layout',
  components: { Navbar, NavFooter },
  computed: {
    cachedViews() {
      return []
    },
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  header {
    height: 100px;
  }
  footer {
    height: 100px;
    margin-top: auto;
  }
}
</style>
