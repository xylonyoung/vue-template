<template>
  <div class="password-container">
    <el-form ref="form" :rules="rules" :model="formData" hide-required-asterisk>
      <el-form-item label="当前密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onSubmit('form')">
          修改密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {},
    }
  },
  methods: {
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
.password-container {
  display: flex;
  justify-content: center;
  .el-form {
    width: 300px;
  }
}
</style>
