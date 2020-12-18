<template>
  <div class="layout-container">
    <header v-if="hideHeader"><navbar /></header>
    <main>
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
export default {
  name: 'Layout',
  components: { Navbar, NavFooter },
  computed: {
    key() {
      return this.$route.path
    },
    hideHeader() {
      return !hideHeaderPaths.includes(this.$route.path)
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  watch: {
    $route: {
      handler() {
        this.resizeHandler()
      },
      deep: true,
    },
  },
  mounted() {
    this.resizeHandler()
  },
  methods: {
    resizeHandler() {
      this.$store.dispatch('app/resize', this)
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
  .main-container {
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
