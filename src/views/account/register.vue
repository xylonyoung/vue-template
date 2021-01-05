<template>
  <div class="account-form">
    <div class="title">{{ $t('login.signUp') }}</div>
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
        />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="registerForm.password"
          :placeholder="$t('login.password')"
          show-password
        />
      </el-form-item>
      <el-form-item label="" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          :placeholder="$t('login.confirmPassword')"
          show-password
        />
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input
          v-model="registerForm.email"
          :placeholder="$t('base.email')"
        />
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input
          v-model="registerForm.phone"
          :placeholder="$t('base.phone')"
        />
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
        <el-checkbox v-model="registerForm.agreement" />
        <router-link target="_blank" to="/agreement" style="margin-left: 10px">
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
      <el-button type="success" @click="onSubmit('registerForm')">
        微信一键注册
      </el-button>
    </div>
    <div class="account">
      <router-link to="/account/login">{{ $t('login.login') }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {},
      rules: {
        username: [
          {
            required: true,
            message: this.$t('login.username'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('login.password'),
            trigger: 'blur',
          },
        ],
      },
      fileList: [],
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push('/account/login')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.submit-btn {
  display: flex;
}
</style>
