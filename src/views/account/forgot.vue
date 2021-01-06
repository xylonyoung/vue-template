<template>
  <div class="account-form">
    <div class="title">{{ $t('account.resetPassword') }}</div>
    <el-form
      ref="resetForm"
      :rules="rules"
      :model="resetForm"
      hide-required-asterisk
    >
      <el-form-item label="" prop="phone">
        <el-input
          v-model="resetForm.phone"
          :placeholder="$t('account.phone')"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="verificationCode">
        <el-input
          v-model="resetForm.verificationCode"
          :placeholder="$t('account.verificationCode')"
        >
          <el-button slot="append">{{ $t('account.sendCode') }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="newPassword">
        <el-input
          v-model="resetForm.newPassword"
          :placeholder="$t('account.newPassword')"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="confirmPassword">
        <el-input
          v-model="resetForm.confirmPassword"
          :placeholder="$t('account.confirmPassword')"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="submit-btn">
      <el-button type="warning" @click="onSubmit('resetForm')">
        {{ $t('account.submit') }}
      </el-button>
    </div>
    <div class="account">
      <router-link to="/account/login">{{ $t('account.toLogin') }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resetForm: {},
      rules: {
        password: [
          {
            required: true,
            message: this.$t('account.password'),
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(this.$t('account.password')))
              } else if (value !== this.registerForm.password) {
                callback(new Error(this.$t('account.notMatch')))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('account.phone'),
            trigger: 'blur'
          }
        ],
        verificationCode: [
          {
            required: true,
            message: this.$t('account.verificationCode'),
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
          this.$api.post('forgot', this.resetForm).then(res => {
            this.$router.push('account/login')
            this.$message.success(this.$t('account.success'))
          })
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
