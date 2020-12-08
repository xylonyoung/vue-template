<template>
  <div class="navbar-container">
    <el-image
      :src="require('@/assets/long-logo.png')"
      fit="contain"
      class="logo"
    ></el-image>
    <div class="nav-list">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#ffc702"
      >
        <el-menu-item
          :index="index.toString()"
          v-for="(item, index) in pages"
          :key="index"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <lang-selector />
  </div>
</template>
<script>
import LangSelector from '@/components/lang-selector/lang-selector.vue'
export default {
  components: { LangSelector },
  computed: {
    activeIndex() {
      return this.pages.findIndex(e => e.link === location.pathname).toString()
    },
    pages() {
      return [
        { name: this.$t('navbar.home'), link: '/' },
        { name: this.$t('navbar.aboutUs'), link: '/about-us' },
        { name: this.$t('navbar.ship'), link: '/ship' },
        { name: this.$t('navbar.recommendation'), link: '/recommendation' },
        { name: this.$t('navbar.news'), link: '/news' },
        { name: this.$t('navbar.partner'), link: '/partner' },
        { name: this.$t('navbar.contact'), link: '/contact' },
      ]
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.$router.push(this.pages[key].link)
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar-container {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 200px;
  height: 100px;
}
.nav-list {
  margin: 0 30px;
}
</style>