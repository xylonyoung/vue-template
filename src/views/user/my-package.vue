<template>
  <div class="user-right-wrapper-table">
    <div class="search">
      <el-select v-model="queryData.type" :placeholder="$t('base.warehouse')">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-input
        v-model="queryData.number"
        :placeholder="$t('base.trackingNumber')"
      ></el-input>
      <el-button type="primary" icon="el-icon-search">{{ $t('base.search') }}</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="trackingNumber"
        :label="$t('base.trackingNumber')"
        width="200"
      ></el-table-column>
      <el-table-column prop="date" :label="$t('base.time')" width="100"></el-table-column>
      <el-table-column
        prop="warehouse"
        :label="$t('base.warehouse')"
        width="200"
      ></el-table-column>
      <el-table-column prop="warehouse" :label="$t('base.status')"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      queryData: {},
      tableData: [
        {
          date: '2016-05-02',
          trackingNumber: '1234567890123456',
          warehouse: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          trackingNumber: '1234567890123456',
          warehouse: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          trackingNumber: '1234567890123456',
          warehouse: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          trackingNumber: '1234567890123456',
          warehouse: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .el-input {
    margin: 0 20px;
  }
}
.el-table {
  margin: 20px 0;
}
</style>