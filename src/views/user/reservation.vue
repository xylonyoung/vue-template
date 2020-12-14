<template>
  <div class="user-right-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      hide-required-asterisk
    >
     
      <el-form-item :label="$t('base.packageName')" prop="packageName">
        <el-input v-model="ruleForm.packageName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('base.shipmentNumber')" prop="shipmentNumber">
        <el-input v-model="ruleForm.shipmentNumber"></el-input>
      </el-form-item>
       <el-form-item :label="$t('base.warehouse')" prop="warehouse">
        <el-select v-model="ruleForm.type">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="australiaId">

      </el-form-item>
      <el-form-item :label="$t('base.notes')" prop="notes">
        <el-input v-model="ruleForm.notes" type="textarea"></el-input>
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
      rules: {},
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