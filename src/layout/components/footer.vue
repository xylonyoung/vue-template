<template>
  <div class="footer-container">
    <div class="links">
      <router-link
        class="link-item"
        :to="item.link"
        v-for="(item, index) in pages"
        :key="index"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="copyright">
      Copyright © 2020 Apple Inc. 保留所有权利。京ICP备10214630 营业执照
      无线电发射设备销售备案编号11201910351200
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    pages() {
      return [
        { name: this.$t('navbar.home'), link: '/' },
        { name: this.$t('navbar.aboutUs'), link: '/about-us' },
        { name: this.$t('navbar.ship'), link: '/ship' },
        { name: this.$t('navbar.recommendation'), link: '/recommendation' },
        { name: this.$t('navbar.partner'), link: '/partner' },
        { name: this.$t('navbar.contact'), link: '/contact' },
      ]
    },
  },

  methods: {
    navTo(link) {
      this.$router.push(link)
    },
  },
}
</script>
<style lang="scss" scoped>
.footer-container {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background-color: #394052;
  .links {
    margin-bottom: 10px;
    .link-item {
      font-size: 14px;
      color: #fff;
      text-decoration: none;
    }
    .link-item + .link-item {
      position: relative;
      margin-left: 30px;
      &:before {
        content: '';
        position: absolute;
        width: 14px;
        top: 50%;
        left: 0;
        border-top: 1px solid #fff;
        transform: translate3d(-23px, -1px, 0) rotate(90deg);
      }
    }
    .el-button--text {
      color: #fff;
    }
  }
  .copyright {
    font-size: 12px;
    color: #9dafc0;
  }
}
</style>