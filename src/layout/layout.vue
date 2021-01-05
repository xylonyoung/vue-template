<template>
  <div class="layout-container">
    <header><navbar /></header>
    <main :style="{ width: mainWidth }">
      <keep-alive :max="10">
        <transition name="fade">
          <router-view :key="key" />
        </transition>
      </keep-alive>
    </main>
    <footer v-if="!mobile">
      <nav-footer />
    </footer>
  </div>
</template>
<script>
import Navbar from './components/navbar'
import NavFooter from './components/footer'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: { Navbar, NavFooter },
  computed: {
    ...mapGetters(['mainWidth', 'mobile']),
    key() {
      return this.$route.path.split('/')[1]
    }
  }
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
