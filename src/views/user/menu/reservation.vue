<template>
  <div class="reservation-container">
    <div class="title">请填写卖家发货的包裹信息</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      hide-required-asterisk
    >
      <el-form-item label="发货网站" prop="website">
        <el-select v-model="ruleForm.website">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="包裹单号" prop="trackNumber">
        <div class="form-flex">
          <el-input v-model="ruleForm.trackNumber" />
          <el-button type="success">添加包裹详情</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-table :data="ruleForm.packages" class="form-table">
          <el-table-column label="商品名称" width="300">
            <template slot-scope="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="数量" width="100">
            <template slot-scope="{ row }">
              <el-input v-model="row.quantity" />
            </template>
          </el-table-column>
          <el-table-column label="单价（日元）" width="200">
            <template slot-scope="{ row }">
              <el-input v-model="row.price" />
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-button size="mini" type="success" @click="handleCreate">
                {{ $t('base.create') }}
              </el-button>
            </template>
            <template slot-scope="{ $index }">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete($index)"
              >
                {{ $t('base.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="增值服务" prop="">
        <el-checkbox v-model="ruleForm.exceptions" />
        <el-button type="text">货到付款</el-button>
      </el-form-item>
      <el-form-item label="表格" prop="">
        <el-button type="primary">上传</el-button>
        <el-button type="success">下载</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="submitForm('ruleForm')">
          提交包裹预报
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['language'])
  },
  data() {
    return {
      ruleForm: { packages: [[]] },
      rules: {}
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
    handleCreate() {
      this.ruleForm.packages.push([])
    },
    handleDelete(index) {
      this.ruleForm.packages.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}
.form-flex {
  display: flex;
  width: 400px;
  .el-button {
    margin-left: 10px;
  }
}
.form-table {
  width: 700px;
}
</style>
