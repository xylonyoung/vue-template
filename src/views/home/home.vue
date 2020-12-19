<template>
  <div>
    <el-carousel :height="mobile ? '150px' : '300px'">
      <el-carousel-item v-for="item in 3" :key="item">
        <el-image
          :src="require('@/assets/temp/carousel.jpg')"
          fit="fit"
          style="width: 100%; height: 100%"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="login">
      <div v-if="token">
        <div class="login-btn">
          <el-button type="warning" round @click="navTo('user')">
            {{ $t('base.member') }}
          </el-button>
        </div>
      </div>
      <div v-else>
        <div class="login-btn">
          <el-button type="warning" round @click="navTo('login')">
            {{ $t('home.login') }}
          </el-button>
        </div>
        <div class="login-btn">
          <el-button type="warning" round @click="navTo('register')">
            {{ $t('home.register') }}
          </el-button>
        </div>
      </div>
      <div class="total">
        <div>
          <div>
            <el-image :src="require('@/assets/home/van.png')" fit="contain"></el-image>
            <count-to :start-val="0" :end-val="2930" class="count-to" />
            <span v-if="language === 'zh'">件</span>
          </div>
          <div class="count-name">{{ $t('home.packages') }}</div>
        </div>
        <div>
          <div>
            <el-image
              :src="require('@/assets/home/cooperation.png')"
              fit="contain"
            ></el-image>
            <count-to :start-val="0" :end-val="230" class="count-to" />
            <span v-if="language === 'zh'">家</span>
          </div>
          <div class="count-name">{{ $t('home.cooperation') }}</div>
        </div>
        <div>
          <div>
            <el-image
              :src="require('@/assets/home/project.png')"
              fit="contain"
            ></el-image>
            <count-to :start-val="0" :end-val="1000" class="count-to" />
            <span v-if="language === 'zh'">个</span>
          </div>
          <div class="count-name">{{ $t('home.projects') }}</div>
        </div>
      </div>
    </div>
    <div class="view-more">
      <div v-for="(item, index) in viewMore" :key="index" class="item">
        <el-image :src="require(`@/assets/home/${item.img}.png`)"></el-image>
        <div class="name">{{ item.name }}</div>
        <el-button type="warning" round @click="navTo(item.link)">
          {{ $t('home.viewMore') }}
        </el-button>
      </div>
    </div>
    <div class="hot-sale">
      <div class="title-wrapper">
        <div class="title">
          <span>{{ $t('home.hotSale') }}</span>
          <div>/ POLICIES</div>
        </div>
        <el-button type="warning" plain round>MORE</el-button>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in 4" :key="index">
          <el-image :src="hotSale.src"></el-image>
          <div class="name">
            {{ hotSale.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="partnership">
      <div class="title-wrapper">
        <div class="title">
          <span>{{ $t('home.partnership') }}</span>
          <div>/ POLICIES</div>
        </div>
        <el-button type="warning" plain round>MORE</el-button>
      </div>
      <div class="images">
        <div class="logo" v-for="(item, index) in 12" :key="index">
          <el-image :src="require('@/assets/temp/1.jpg')" fit="contain"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    CountTo,
  },
  computed: {
    ...mapGetters(['language', 'mobile', 'token']),
    viewMore() {
      return [
        {
          name: this.$t('home.ocean'),
          link: '',
          img: 'shipping',
        },
        {
          name: this.$t('home.air'),
          link: '',
          img: 'air',
        },
        {
          name: this.$t('home.quote'),
          link: '',
          img: 'freight',
        },
        {
          name: this.$t('home.service'),
          link: '',
          img: 'service',
        },
      ]
    },
  },
  data() {
    return {
      hotSale: {
        name: '米家互联网洗烘一体机 Pro 10kg',
        src:
          'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ec20453216dcd42f982cffe5fdbc3115.jpg?thumb=1&w=200&h=200&f=webp&q=90',
      },
    }
  },
  methods: {
    navTo(link) {
      if (link === 'register') {
        this.$router.push({
          path: 'login',
          query: {
            active: 'register',
          },
        })
      } else {
        this.$router.push(link)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 10%;
  background-color: #f5f5f5;
  .login-btn + .login-btn {
    margin-top: 10px;
  }
  .login-btn {
    width: 110px;
    .el-button {
      width: 100%;
    }
  }
  .total {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 60%;
    &:before {
      content: '';
      position: absolute;
      top: calc((90px - 100%) / -2);
      left: calc((100% / 0.6 - 100% - 110px) / 2 / -2);
      height: 90px;
      border-left: 2px solid #a6a6a6;
    }

    .el-image {
      width: 40px;
      height: 40px;
    }
    .count-to {
      position: relative;
      font-size: 30px;
      color: #ffc702;
      &:before {
        content: '';
        position: absolute;
        bottom: -20%;
        left: -36px;
        width: 90px;
        border-bottom: 2px solid #ffc702;
      }
    }
    .count-name {
      margin-top: 10px;
    }
  }
}
.view-more {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px 10%;
  .item + .item {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-left: 1px solid #eee;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    .name {
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
    }
    .el-image {
      width: 120px;
    }
  }
}
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  .title {
    display: flex;
    align-items: center;
    & span:first-child {
      position: relative;
      padding-left: 10px;
      font-size: 20px;
      font-weight: bold;
      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 0;
        height: 20px;
        border-left: 3px solid #ffc702;
      }
    }
    & div:last-child {
      font-size: 12px;
      color: #989898;
      transform: translate3d(4px, 8px, 0);
    }
  }
  .el-button {
    color: #ffc702;
    &:hover {
      color: #fff;
    }
  }
}
.hot-sale {
  padding: 20px 10% 50px;
  background-color: #f5f5f5;
  .items {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    place-items: center;
    padding: 20px 0;
    .item {
      height: 200px;
      .name {
        padding-top: 10px;
      }
    }
  }
}
.partnership {
  padding: 20px 10%;
  .images {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    place-items: center;
    padding: 20px 0;
    .logo {
      width: 90%;
      height: 90px;
      margin-bottom: 20px;
      border: 1px solid #e1e1e1;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
