<template>
  <div>
    <div class="search">
      <el-input v-model="searchData" placeholder="收货人姓名" />
      <el-input v-model="searchData" placeholder="手机号码/备用号码" />
      <el-input v-model="searchData" placeholder="地址" />
      <el-button type="primary">搜索</el-button>
      <el-button type="success">新增</el-button>
    </div>
    <el-table :data="list">
      <el-table-column label="姓名" width="100">
        <template slot-scope="{ row }">
          <div>{{ row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" width="120">
        <template slot-scope="{ row }">
          <div>{{ row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="备用号码" width="120">
        <template slot-scope="{ row }">
          <div>{{ row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="{ row }">
          <div>{{ row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" width="150">
        <template slot-scope="{ $index }">
          <el-button size="mini" type="success" @click="handleCreate">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete($index)">
            {{ $t('base.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      searchData: '',
      list: [
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号'
        },
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号'
        },
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
.search {
  display: flex;
  .el-input {
    width: 25%;
  }
}
.pagination {
  margin-top: 20px;
}
</style>
