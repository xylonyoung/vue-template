<template>
  <div class="login-container">
    <div class="wrapper">
      <el-image :src="logo" fit="contain"></el-image>
      <div class="login-form">
        <div class="title">{{ $t('login.title') }}</div>
        <el-form ref="form" :rules="rules" :model="formData" hide-required-asterisk>
          <el-form-item label="" prop="username">
            <el-input
              v-model="formData.username"
              :placeholder="$t('login.username')"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="formData.password"
              :placeholder="$t('login.password')"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="submit-btn">
          <el-button type="warning" @click="onSubmit">
            {{ $t('login.confirm') }}
          </el-button>
        </div>
        <div class="account">
          <el-button type="text" @click="navTo('register')">
            {{ $t('login.register') }}
          </el-button>
          <el-button type="text" @click="navTo('forgot')">
            {{ $t('login.forgot') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="center-img" :style="`background-image: url(${centerImg})`"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {
        username: [
          { required: true, message: this.$t('login.username'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('login.password'), trigger: 'blur' },
        ],
      },
      logo:
        'https://account.xiaomi.com/static/res/7f6f2f5/account-static/respassport/acc-2014/img/mistore_logo.png',
      centerImg:
        'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/72644d9b8031286de3cc74e151aefd90.jpg',
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    navTo(link) {
      this.$router.push(link)
    },
  },
}
</script>
<style lang="scss" scoped>
.login-container {
  min-height: auto;
  position: relative;
}
.wrapper {
  width: 1130px;
  margin: 0 auto;
}
.login-form {
  position: relative;
  margin-top: 210px;
  padding: 30px;
  float: right;
  width: 340px;
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
    .el-button + .el-button {
      position: relative;
      margin-left: 20px;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        border-left: 2px solid#409EFF;
        transform: translate3d(-10px, 11px, 0);
      }
    }
  }
}
.center-img {
  width: 100%;
  height: 588px;
  position: absolute;
  left: 0;
  top: 98px;
  background-repeat: no-repeat;
  background-position: top center;
}
</style>