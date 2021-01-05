<template>
  <div class="footer-container">
    <div class="top">
      <div class="detail">
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
        <div class="business-info">
          <div>
            <div>工作日 9:00-18:00 11:00-12:00午休</div>
            <div>节假日 9:00-17:00 11:00-12:00午休</div>
            <div>联系邮箱：mail@daikei-tenso.com</div>
            <div>官方微博：XXX起航转运</div>
          </div>
          <div class="phone">
            <div class="icon">
              <i class="el-icon-phone-outline icon"></i>
            </div>
            <div>全国客服热线</div>
            <div>12345678901</div>
          </div>
        </div>
      </div>
      <div class="qrcode">
        <div class="join-qq">
          <el-button type="primary" size="mini">
            <icon name="QQ" />
            加入QQ群
          </el-button>
        </div>
        <div class="qrcode-group">
          <div class="qrcode-img" v-for="(item, index) in 3" :key="index">
            <el-image
              style="width: 90px; height: 90px"
              :src="require('@/assets/temp/qrcode.png')"
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
    </div>

    <div class="copyright">
      <span>{{ $t('copyright') }}</span>
      <template>
        <span>京ICP备10214630</span>
        <span>营业执照</span>
        <span>无线电发射设备销售备案编号11201910351200</span>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['mobile']),
    pages() {
      return [
        { name: '关于我们', link: '/about-us' },
        { name: '联系我们', link: '/contact' },
        { name: '签收需知', link: '/ship' },
        { name: '服务协议', link: '/product' },
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
  min-height: 50px;
  color: #fff;
  background-color: #151515;
}
.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .detail {
    .business-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      height: 100px;
      .phone {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:before {
          content: '';
          position: absolute;
          height: 80px;
          top: 0;
          left: 0;
          border-left: 1px solid #383838;
          transform: translate3d(-49px, 5px, 0);
        }
        .icon {
          height: auto;
          font-size: 30px;
          text-align: center;
        }
      }
    }
    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      .link-item {
        font-size: 14px;
        color: #fff;
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
          border-top: 1px solid #383838;
          transform: translate3d(-23px, -1px, 0) rotate(90deg);
        }
      }
      .el-button--text {
        color: #fff;
      }
    }
  }
  .qrcode {
    margin: 10px 0;
    .join-qq {
      margin-bottom: 10px;
      .el-button--mini {
        padding: 3px 10px;
      }
    }
    .qrcode-group {
      display: flex;
      .qrcode-img + .qrcode-img {
        margin-left: 20px;
      }
      .qrcode-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: #fff;
      }
    }
  }
}
.copyright {
  padding: 5px;
  background-color: #1d1d1d;
  text-align: center;
  font-size: 12px;
  color: #fff;
  span + span {
    margin-left: 10px;
  }
}
</style>