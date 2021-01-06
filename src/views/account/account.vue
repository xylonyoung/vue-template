<template>
  <div ref="account">
    <div class="top">
      <router-link to="/" style="display: flex; align-items: center">
        <el-image :src="require('@/assets/long-logo.png')" fit="contain" />
      </router-link>
      <el-button type="text"><lang-selector /></el-button>
    </div>

    <transition name="slide" mode="out-in">
      <router-view :key="key" />
    </transition>

    <div class="center-img">
      <video
        autoplay
        muted
        :src="centerVideo"
        v-if="background === 'video'"
      ></video>
      <el-image :src="centerImg" fit="contain" v-else />
    </div>

    <nav-footer v-if="!mobile" class="footer" />
  </div>
</template>
<script>
import langSelector from '@/components/lang-selector/lang-selector.vue'
import NavFooter from '@/layout/components/footer'
import { mapGetters } from 'vuex'
export default {
  components: { langSelector, NavFooter },
  computed: {
    ...mapGetters(['language', 'mobile']),
    key() {
      return this.$route.path
    }
  },
  watch: {
    mobile: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          document.getElementsByClassName('account-form').forEach(e => {
            e.style.position = val ? 'static' : 'absolute'
          })
        })
      }
    }
  },
  data() {
    return {
      background: 'video',
      centerImg:
        'https://www.apple.com/v/iphone-12/e/images/overview/hero/hero_endframe__fc7apyu3c7au_large.jpg',
      centerVideo:
        'https://www.apple.com/105/media/us/iphone-12/2020/7f5b7de7-9f8c-41eb-bf3b-f294773108e6/anim/hero/large.mp4'
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (form === 'loginForm') {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push('/user')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  opacity: 0;
  transform: translateY(-50%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.account-container {
  position: relative;
  .mobile {
    margin: 0;
    width: calc(100% - 60px);
  }
}
.top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  margin: 0 auto;
}

.center-img {
  width: 100%;
  height: calc(100vh - 290px);
  top: 100px;
  background-color: #f1eff1;
  video {
    height: 100%;
  }
  .el-image {
    width: 100%;
    height: 100%;
  }
}

::v-deep .account-form {
  position: absolute;
  top: 100px;
  right: 20%;
  padding: 30px;
  width: 300px;
  background-color: #fff;
  z-index: 9;
  .title {
    padding-bottom: 30px;
    text-align: center;
    font-size: 24px;
    color: #f56600;
  }
  .submit-btn {
    width: 100%;
    padding: 20px 0;
    .el-button {
      width: 100%;
    }
  }
  .account {
    display: flex;
    justify-content: center;
    color: #999;
    a + a {
      position: relative;
      margin-left: 20px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        border-left: 2px solid#999;
        transform: translate(-10px, 0);
      }
    }
  }
}
</style>
