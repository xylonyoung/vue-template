<template>
  <div class="account-form">
    <div class="title">{{ $t('account.signUp') }}</div>
    <el-form
      ref="registerForm"
      :rules="rules"
      :model="registerForm"
      hide-required-asterisk
    >
      <el-form-item label="" prop="username">
        <el-input
          v-model="registerForm.username"
          :placeholder="$t('account.username')"
        />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="registerForm.password"
          :placeholder="$t('account.password')"
          show-password
        />
      </el-form-item>
      <el-form-item label="" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          :placeholder="$t('account.confirmPassword')"
          show-password
        />
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input
          v-model="registerForm.email"
          :placeholder="$t('account.email')"
        />
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input
          v-model="registerForm.phone"
          :placeholder="$t('account.phone')"
        />
      </el-form-item>
      <el-form-item label="" prop="verificationCode">
        <el-input
          v-model="registerForm.verificationCode"
          :placeholder="$t('account.verificationCode')"
        >
          <el-button slot="append">{{ $t('account.sendCode') }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="agreement">
        <el-checkbox v-model="registerForm.agreement" />
        <router-link target="_blank" to="/agreement" style="margin-left: 10px">
          <el-button type="text">
            {{ $t('account.agreement') }}
          </el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <div class="submit-btn">
      <el-button type="warning" @click="onSubmit('registerForm')">
        {{ $t('account.submit') }}
      </el-button>
      <el-button type="success" @click="onSubmit('registerForm')">
        微信一键注册
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
      registerForm: {},
      rules: {
        username: [
          {
            required: true,
            message: this.$t('account.username'),
            trigger: 'blur'
          }
        ],
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
        email: [
          {
            required: true,
            message: this.$t('account.email'),
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
          this.$api.post('mobile-register', this.registerForm).then(res => {
            this.$router.push('account/login')
            this.$message.success(this.$t('account.success'))
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
    }
  }
}
</script>
<style lang="scss" scoped>
.submit-btn {
  display: flex;
}
</style>
