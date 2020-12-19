<template>
  <div class="layout-container">
    <header v-if="hideHeader"><navbar /></header>
    <main :style="{ width: mainWidth }">
      <keep-alive :max="10">
        <transition name="fade">
          <router-view :key="key" />
        </transition>
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
import { hideHeaderPaths } from '@/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: { Navbar, NavFooter },
  computed: {
    ...mapGetters(['mainWidth']),
    key() {
      return this.$route.path
    },
    hideHeader() {
      return !hideHeaderPaths.includes(this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  footer {
    margin-top: auto;
  }
  main {
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
