<template>
  <div>
    <el-dialog
      title="充值"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="600px"
    >
      <div class="top-up">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="账户余额" prop="balance">
            <div>0.00元</div>
          </el-form-item>
          <el-form-item label="充值金额" prop="amount">
            <el-input v-model="ruleForm.amount" />
          </el-form-item>
          <el-form-item label="支付方式" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="支付宝" />
              <el-radio label="微信" />
              <el-radio label="银联" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              确认
            </el-button>
          </el-form-item>
          <el-form-item>
            <div>*注意：提现余额将会收取手续费，请确认后再进行充值！</div>
            <div>支付完成后请耐心等待跳转，否则将无法立即到账</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)">
          取 消
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.top-up {
  width: 90%;
}
</style>
