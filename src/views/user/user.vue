<template>
  <div class="user-wrapper">
    <div class="main-container">
      <div class="user">
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
          <user-track v-if="activeMenu === 'track'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserTrack from './track.vue'
export default {
  components: { UserTrack },
  computed: {
    ...mapGetters(['user']),
    userMenu() {
      return [
        'track',
        'quote',
        'ship',
        'getPackage',
        'warehouse',
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
  created() {
    this.$store.commit('user/SET_USER', {
      name: 'Angelina Jolie',
      userId: '2554789',
      avatar:
        'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1760455784,274818819&fm=26&gp=0.jpg',
    })
  },
  methods: {
    menuHandler(item) {
      this.activeMenu = item.name
    },
  },
}
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  width: 80%;
  margin: 30px auto;
  background-color: #fff;
  border-top: 3px solid #ffc702;
  .left {
    width: 20%;
    padding: 20px 0;
    text-align: center;
    border-right: 3px solid #f5f5f5;
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