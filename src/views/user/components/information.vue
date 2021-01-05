<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="保密" />
          <el-radio label="女" />
          <el-radio label="男" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="国家/地区" prop="country">
        <el-input v-model="ruleForm.country" />
      </el-form-item>
      <el-form-item label="省/洲" prop="state">
        <el-input v-model="ruleForm.state" />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="ruleForm.city" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" />
      </el-form-item>
      <el-form-item label="邮编" prop="postcode">
        <el-input v-model="ruleForm.postcode" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCardNum">
        <el-input v-model="ruleForm.idCardNum" />
      </el-form-item>
      <el-form-item label="备用电话" prop="sparePhone">
        <el-input v-model="ruleForm.sparePhone" />
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="ruleForm.wechat" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
.el-form {
  width: 50%;
}
</style>
