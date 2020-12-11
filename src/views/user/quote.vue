<template>
  <div class="user-right-wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" hide-required-asterisk>
      <el-form-item :label="$t('base.length')" prop="length">
        <el-input v-model="ruleForm.length" type="number">
          <span slot="suffix">CM</span>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('base.width')" prop="width">
        <el-input v-model="ruleForm.width" type="number">
          <span slot="suffix">CM</span>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('base.height')" prop="height">
        <el-input v-model="ruleForm.height" type="number">
          <span slot="suffix">CM</span>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('base.weight')" prop="weight">
        <el-input v-model="ruleForm.weight" type="number">
          <span slot="suffix">KG</span>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('base.quantity')" prop="quantity">
        <el-input-number
          v-model="ruleForm.quantity"
          @change="handleChange"
          :min="1"
        ></el-input-number>
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
      ruleForm: {
        quantity: 1,
      },
      rules: {
        length: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        width: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        height: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        weight: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
        quantity: [{ required: true, message: this.$t('base.input'), trigger: 'blur' }],
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
    handleChange(value) {
      console.log(value)
      this.ruleForm.quantity = value
    },
  },
}
</script>
<style lang="scss" scoped>
</style>