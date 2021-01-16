<template>
  <div
    class="navbar-container"
    :class="mobile ? 'navbar-container-mobile' : ''"
  >
    <div class="navbar-top">
      <div class="marquee"></div>
      <div class="navbar-top-btn">
        <template v-if="!token">
          <router-link to="/account/login">登录</router-link>
          <router-link to="/account/register" class="line-between">
            注册
          </router-link>
        </template>
        <el-button type="text"><lang-selector /></el-button>
        <el-button type="primary" size="mini">
          <icon name="QQ" />
          截图接收专用
        </el-button>
      </div>
    </div>

    <div class="navbar-wrapper">
      <i
        class="el-icon-s-unfold"
        v-if="mobile"
        style="font-size: 30px"
        @click="drawer = true"
      ></i>
      <router-link to="/" style="display: flex; align-items: center">
        <el-image
          :src="require('@/assets/long-logo.png')"
          fit="contain"
          :style="logoStyle"
        ></el-image>
      </router-link>
      <div class="nav-list" v-if="!mobile">
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LangSelector from '@/components/lang-selector/lang-selector.vue'
export default {
  components: { LangSelector },
  computed: {
    ...mapGetters(['mobile', 'token']),
    activeIndex() {
      return this.pages.findIndex(e => e.link === this.$route.path).toString()
    },
    pages() {
      return [
        { name: '首页', link: '/' },
        { name: '会员中心', link: '/user' },
        { name: '转运线路', link: '/about-us' },
        { name: '费用时效', link: '/ship' },
        { name: '使用指南', link: '/product' },
        { name: '日淘教程', link: '/news' },
        { name: '日淘晒单', link: '/partner' },
        { name: '网站公告', link: '/news' },
        { name: '帮助中心', link: '/contact' }
      ]
    },
    logoStyle() {
      if (this.mobile) {
        return 'width: 200px; height: 50px'
      } else {
        return 'width: 200px; height: 60px'
      }
    }
  },
  data() {
    return {
      drawer: false,
      marqueeContent: '欢迎来到起航转运！当前汇率:0.06614'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.drawer = false
      this.$router.push(this.pages[key].link)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-container-mobile {
  .navbar-top {
    display: block;
    height: 65px;
    .marquee {
      width: 100%;
    }
  }
  .navbar-wrapper {
    height: 70px;
    justify-content: space-around;
  }
}
.navbar-top {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  height: 40px;
  .marquee {
    width: 600px;
    margin-right: 10px;
  }
  .navbar-top-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .line-between {
    position: relative;
    margin: 0 15px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 14px;
      border-left: 1px solid #ccc;
      transform: translate3d(-8px, 3px, 0);
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 14px;
      border-right: 1px solid #ccc;
      transform: translate3d(8px, 3px, 0);
    }
  }
  .el-button--mini {
    padding: 3px 10px;
  }
}
.navbar-wrapper {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #307be1;
}

.nav-list {
  margin: 0 30px;
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .el-menu-item.is-active {
    border: none;
    font-weight: bold;
  }
}
</style>
