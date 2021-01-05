<template>
  <div class="account-form">
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
      <router-link to="/account/login">{{ $t('login.login') }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resetForm: {},
      rules: {
        username: [
          {
            required: true,
            message: this.$t('login.username'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.password'),
            trigger: 'blur'
          }
        ]
      },
      fileList: []
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$router.push('/account/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
