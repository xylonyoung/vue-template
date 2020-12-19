<template>
  <div class="navbar-container" :class="mobile ? 'navbar-mobile' : ''">
    <i
      class="el-icon-s-unfold"
      v-if="mobile"
      style="font-size: 30px"
      @click="drawer = true"
    ></i>
    <el-image
      :src="require('@/assets/long-logo.png')"
      fit="contain"
      :style="logoStyle"
    ></el-image>
    <div class="nav-list" v-show="!mobile">
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
          <i class="el-icon-s-custom" v-if="item.link === '/user'"></i>
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <lang-selector />
    <el-drawer :visible.sync="drawer" direction="ltr" :show-close="false">
      <el-menu
        :default-active="activeIndex"
        mode="vertical"
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
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LangSelector from '@/components/lang-selector/lang-selector.vue'
export default {
  components: { LangSelector },
  computed: {
    ...mapGetters(['mobile', 'user']),
    activeIndex() {
      return this.pages.findIndex(e => e.link === this.$route.path).toString()
    },
    pages() {
      let arr = [
        { name: this.$t('navbar.home'), link: '/' },
        { name: this.$t('navbar.aboutUs'), link: '/about-us' },
        { name: this.$t('navbar.ship'), link: '/ship' },
        { name: this.$t('navbar.product'), link: '/product' },
        { name: this.$t('navbar.news'), link: '/news' },
        { name: this.$t('navbar.partner'), link: '/partner' },
        { name: this.$t('navbar.contact'), link: '/contact' },
      ]
      if (this.user.name) {
        arr.push({ name: this.user.name, link: '/user' })
      }
      return arr
    },
    logoStyle() {
      if (this.mobile) {
        return 'width: 220px; height: 70px'
      } else {
        return 'width: 220px; height: 100px'
      }
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.drawer = false
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
.navbar-mobile {
  height: 90px;
  justify-content: space-around;
}
.nav-list {
  margin: 0 30px;
}
</style>