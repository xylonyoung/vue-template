<template>
  <div class="login-wrapper">
    <div class="main-container">
      <div class="top">
        <router-link to="/" style="display: flex; align-items: center">
          <el-image :src="require('@/assets/long-logo.png')" fit="contain"></el-image>
        </router-link>
        <lang-selector />
      </div>
      <transition name="slide" mode="out-in">
        <div class="login-form" key="loginForm" v-if="activeForm === 'loginForm'">
          <div class="title">{{ $t('login.signIn') }}</div>
          <el-form
            ref="loginForm"
            :rules="rules"
            :model="loginForm"
            hide-required-asterisk
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="loginForm.password"
                :placeholder="$t('login.password')"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <el-button type="warning" @click="onSubmit('loginForm')">
              {{ $t('base.submit') }}
            </el-button>
          </div>
          <div class="account">
            <el-button type="text" @click="toShow('register')">
              {{ $t('login.register') }}
            </el-button>
            <el-button type="text" @click="toShow('forgot')">
              {{ $t('login.forgot') }}
            </el-button>
          </div>
        </div>

        <div class="login-form" key="registerForm" v-if="activeForm === 'registerForm'">
          <div class="title">{{ $t('login.signIn') }}</div>
          <el-form
            ref="registerForm"
            :rules="rules"
            :model="registerForm"
            hide-required-asterisk
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="registerForm.username"
                :placeholder="$t('login.username')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="registerForm.password"
                :placeholder="$t('login.password')"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                :placeholder="$t('login.confirmPassword')"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="email">
              <el-input
                v-model="registerForm.email"
                :placeholder="$t('base.email')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="australiaPhone">
              <el-input
                v-model="registerForm.australiaPhone"
                :placeholder="$t('base.australiaPhone')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="australiaAddress">
              <el-select
                v-model="registerForm.australiaAddress"
                :placeholder="$t('base.australiaAddress')"
                style="width: 100%"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="detailedAddress">
              <el-input
                v-model="registerForm.detailedAddress"
                :placeholder="$t('base.detailedAddress')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="australiaId">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small">
                  {{ `${$t('base.upload')}  ${$t('base.australiaId')}` }}
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="" prop="verificationCode">
              <el-input
                v-model="registerForm.verificationCode"
                :placeholder="$t('base.verificationCode')"
              >
                <el-button slot="append">{{ $t('base.sendCode') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="agreement">
              <el-checkbox v-model="registerForm.agreement"></el-checkbox>
              <router-link
                target="_blank"
                :to="{ path: '/agreement', query: { language: language } }"
                style="margin-left: 10px"
              >
                <el-button type="text">
                  {{ $t('base.agreement') }}
                </el-button>
              </router-link>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <el-button type="warning" @click="onSubmit('registerForm')">
              {{ $t('base.submit') }}
            </el-button>
          </div>
          <div class="account">
            <el-button type="text" @click="toShow('login')">
              {{ $t('login.login') }}
            </el-button>
          </div>
        </div>

        <div class="login-form" key="resetForm" v-if="activeForm === 'resetForm'">
          <div class="title">{{ $t('login.resetPassword') }}</div>
          <el-form
            ref="resetForm"
            :rules="rules"
            :model="resetForm"
            hide-required-asterisk
          >
            <el-form-item label="" prop="australiaPhone">
              <el-input
                v-model="resetForm.australiaPhone"
                :placeholder="$t('base.australiaPhone')"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="verificationCode">
              <el-input
                v-model="resetForm.verificationCode"
                :placeholder="$t('base.verificationCode')"
              >
                <el-button slot="append">{{ $t('base.sendCode') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="newPassword">
              <el-input
                v-model="resetForm.newPassword"
                :placeholder="$t('login.newPassword')"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="confirmPassword">
              <el-input
                v-model="resetForm.confirmPassword"
                :placeholder="$t('login.confirmPassword')"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="submit-btn">
            <el-button type="warning" @click="onSubmit('resetForm')">
              {{ $t('base.submit') }}
            </el-button>
          </div>
          <div class="account">
            <el-button type="text" @click="toShow('login')">
              {{ $t('login.login') }}
            </el-button>
          </div>
        </div>
      </transition>
    </div>

    <div class="center-img" :style="`background-image: url(${centerImg})`"></div>
  </div>
</template>
<script>
import langSelector from '@/components/lang-selector/lang-selector.vue'
import { mapGetters } from 'vuex'
export default {
  components: { langSelector },
  computed: {
    ...mapGetters(['language']),
  },
  data() {
    return {
      activeForm: 'loginForm',
      loginForm: {},
      registerForm: {},
      resetForm: {},
      rules: {
        username: [
          { required: true, message: this.$t('login.username'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('login.password'), trigger: 'blur' },
        ],
      },
      fileList: [],
      centerImg:
        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/72644d9b8031286de3cc74e151aefd90.jpg',
    }
  },
  created() {
    const { active } = this.$route.query
    if (active) {
      this.activeForm = active
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (form === 'loginForm') {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push('/')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toShow(name) {
      this.activeForm = name
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
  },
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

.login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin: 0 auto;
}
.login-form {
  position: relative;
  padding: 30px;
  float: right;
  width: 300px;
  background-color: #fff;
  z-index: 9;
  .title {
    padding-bottom: 30px;
    text-align: center;
    font-size: 24px;
    // color: #f56600;
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
    .el-button {
      color: #999;
    }
    .el-button + .el-button {
      position: relative;
      margin-left: 20px;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        border-left: 2px solid#999;
        transform: translate3d(-10px, 11px, 0);
      }
    }
  }
}
.center-img {
  width: 100%;
  height: calc(100vh - 190px);
  position: absolute;
  left: 0;
  top: 100px;
  background-repeat: no-repeat;
  background-position: top center;
}
</style>