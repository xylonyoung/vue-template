<template>
  <el-container>
    <el-header><navbar /></el-header>
    <el-main>
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </el-main>
    <el-footer><nav-footer /></el-footer>
  </el-container>
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
</style>
