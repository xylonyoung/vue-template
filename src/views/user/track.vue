<template>
  <div class="user-right-wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" hide-required-asterisk>
      <el-form-item :label="$t('base.queryType')" prop="type">
        <el-select v-model="ruleForm.type">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('base.trackingNumber')" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
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
        number: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        type: [{ required: true, message: this.$t('base.select'), trigger: 'change' }],
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