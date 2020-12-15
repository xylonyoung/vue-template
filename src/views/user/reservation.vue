<template>
  <div class="user-right-wrapper-table">
    <el-table :data="ruleForm.packages" style="width: 100%">
      <el-table-column :label="$t('base.englishName')" width="300">
        <template slot-scope="{ row }">
          <el-input v-model="row.englishName"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('base.value')" width="90">
        <template slot-scope="{ row }">
          <el-input v-model="row.value"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('base.quantity')" width="90">
        <template slot-scope="{ row }">
          <el-input v-model="row.quantity"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('base.volume')" width="90">
        <template slot-scope="{ row }">
          <el-input v-model="row.volume"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('base.weight')" width="90">
        <template slot-scope="{ row }">
          <el-input v-model="row.weight"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="success" @click="handleCreate">
            {{ $t('base.create') }}
          </el-button>
        </template>
        <template slot-scope="{ $index }">
          <el-button size="mini" type="danger" @click="handleDelete($index)">
            {{ $t('base.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      <el-form-item :label="$t('base.notes')" prop="notes">
        <el-input v-model="ruleForm.notes" type="textarea"></el-input>
      </el-form-item>
      <el-form-item prop="exceptions">
        <el-checkbox v-model="ruleForm.exceptions"></el-checkbox>
        <router-link
          target="_blank"
          :to="{ path: '/exceptions', query: { language: language } }"
          style="margin-left: 10px"
        >
          <el-button type="text">
            {{ $t('base.exceptions') }}
          </el-button>
        </router-link>
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['language']),
  },
  data() {
    return {
      ruleForm: { packages: [[]] },
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
    handleCreate() {
      this.ruleForm.packages.push([])
    },
    handleDelete(index) {
      this.ruleForm.packages.splice(index, 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-bottom: 20px;
  ::v-deep th .cell {
    text-align: center;
  }
}
</style>