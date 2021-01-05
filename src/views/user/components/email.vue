<template>
  <div class="email-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="formData"
      hide-required-asterisk
      label-width="100px"
    >
      <el-form-item label="新邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="formData.code" />
        <el-button type="info" plain @click="createCode">
          {{ verificationCode }}
        </el-button>
      </el-form-item>
      <el-form-item label="新邮箱证码" prop="newCode">
        <el-input v-model="formData.newCode" />
        <el-button @click.prevent="getCode()">点击发送</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onSubmit('form')">
          确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import getCode from '@/utils/verification-code'
export default {
  data() {
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证'))
      } else if (value !== this.verificationCode) {
        callback(new Error('验证错误'))
      } else {
        callback()
      }
    }
    return {
      verificationCode: '',
      formData: {},
      rules: {
        code: [{ validator: validateCode, trigger: 'blur' }],
      },
    }
  },
  created() {
    this.createCode()
  },
  methods: {
    createCode() {
      this.verificationCode = getCode()
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.email-container {
  display: flex;
  justify-content: center;
  .el-input {
    width: 300px;
  }
}
</style>
