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
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    this.resizeHandler()
  },
  methods: {
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = document.documentElement.clientWidth < 1226
        const container = document.getElementsByClassName('main-container')
        this.$store.dispatch('app/mobileDevice', isMobile)
        if (isMobile) {
          container.forEach(e => {
            e.style.width = '100%'
          })
        } else {
          container.forEach(e => {
            e.style.width = '1226px'
          })
        }
      }
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
  }
}
</style>
