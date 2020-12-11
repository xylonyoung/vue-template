<template>
  <div class="user-right-wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" hide-required-asterisk>
      <el-form-item :label="$t('base.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.wechat')" prop="wechat">
        <el-input v-model="ruleForm.wechat"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.email')" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.australiaPhone')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.australiaId')" prop="australiaId">
        <el-input v-model="ruleForm.australiaId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.australiaAddress')" prop="australiaAddress">
        <el-input v-model="ruleForm.australiaAddress" type="textarea"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.australiaAddressee')" prop="australiaAddressee">
        <el-input v-model="ruleForm.australiaAddressee"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="submitForm('ruleForm')">
          {{ $t('base.submit') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        name: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        wechat: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        email: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
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
</style>