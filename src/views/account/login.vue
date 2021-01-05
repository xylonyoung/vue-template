<template>
  <div class="account-form">
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
      <router-link to="/account/register">{{
        $t('login.register')
      }}</router-link>
      <router-link to="/account/forgot">{{ $t('login.forgot') }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {},
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
            this.$router.push('/user')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
