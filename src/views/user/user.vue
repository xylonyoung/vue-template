<template>
  <div class="user-wrapper">
    <div class="user" :style="{ width: userWidth }">
      <div class="left">
        <el-image :src="user.avatar" fit="cover"></el-image>
        <div class="name">{{ user.name }}</div>
        <div class="user-id">ID:{{ user.userId }}</div>
        <div
          v-for="(item, index) in userMenu"
          :key="index"
          class="menu"
          @click="menuHandler(item)"
        >
          <el-button type="warning" round v-if="item.name === activeMenu">
            {{ item.label }}
          </el-button>
          <el-button v-else type="text">{{ item.label }}</el-button>
        </div>
      </div>
      <div class="right">
        <user-track v-show="activeMenu === 'track'" />
        <user-quote v-show="activeMenu === 'quote'" />
        <user-setting v-show="activeMenu === 'setting'" />
        <user-ship v-show="activeMenu === 'ship'" />
        <user-get-package v-show="activeMenu === 'getPackage'" />
        <user-reservation v-show="activeMenu === 'reservation'" />
        <user-my-package v-show="activeMenu === 'myPackage'" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserGetPackage from './get-package.vue'
import UserMyPackage from './my-package.vue'
import UserQuote from './quote.vue'
import UserReservation from './reservation.vue'
import UserSetting from './setting.vue'
import UserShip from './ship.vue'
import UserTrack from './track.vue'
import { mainWidth } from '@/settings'
export default {
  components: {
    UserTrack,
    UserQuote,
    UserSetting,
    UserShip,
    UserGetPackage,
    UserReservation,
    UserMyPackage,
  },
  computed: {
    ...mapGetters(['user', 'mobile']),
    userWidth() {
      return this.isMobile ? '100%' : mainWidth * 0.8 + 'px'
    },
    userMenu() {
      return [
        'track',
        'quote',
        'setting',
        'ship',
        'getPackage',
        'reservation',
        'myPackage',
        'logout',
      ].map(e => {
        return { name: e, label: this.$t(`userMenu.${e}`) }
      })
    },
  },
  data() {
    return {
      activeMenu: 'track',
    }
  },
  created() {},
  methods: {
    menuHandler(item) {
      if (item.name === 'logout') {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push('/')
        })
      } else {
        this.activeMenu = item.name
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.user-wrapper {
  padding: 30px 0;
  min-height: calc(100vh - 250px);
  background-color: #f5f5f5;
}
.user {
  display: flex;
  margin: 0 auto;
  background-color: #fff;
  border-top: 3px solid #ffc702;
  .left {
    width: 20%;
    padding: 20px 0;
    text-align: center;
    border-right: 3px solid #f5f5f5;
    .el-button--text {
      color: #2d2d2d;
    }
    .el-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .user-id {
      padding-bottom: 20px;
      margin-bottom: 20px;
      color: #989898;
      border-bottom: 1px solid #f5f5f5;
    }
    .menu {
      height: 50px;
      margin-top: 10px;
    }
  }
  .right {
    width: 80%;
  }
}
</style>