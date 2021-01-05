<template>
  <div class="consignment-container">
    <div>
      <el-table :data="list">
        <el-table-column type="selection" width="30" />
        <el-table-column label="入库时间" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="包裹单号" width="150">
          <template slot-scope="{ row }">
            <div>{{ row.packageNum }}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单号" width="150">
          <template slot-scope="{ row }">
            <div>{{ row.orderNum }}</div>
          </template>
        </el-table-column>
        <el-table-column label="入库重量" width="80">
          <template slot-scope="{ row }">
            <div>{{ row.weight }}</div>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.comments }}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存天数" width="80">
          <template slot-scope="{ row }">
            <div>{{ row.days }}</div>
          </template>
        </el-table-column>
        <el-table-column label="仓储费" width="80">
          <template slot-scope="{ row }">
            <div>{{ row.fee }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="{ row }">
            <div>{{ row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleCreate(row)">
              查看详情
            </el-button>
            <el-button type="text">单件发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="package-type">
      <div class="type-title">包裹模式</div>
      <div class="type-radio">
        <el-radio v-model="radio" label="1">合箱</el-radio>
        <el-radio v-model="radio" label="2">分箱</el-radio>
        <el-radio v-model="radio" label="3">合箱/后分箱</el-radio>
        <el-input-number
          v-if="radio === '3'"
          v-model="num"
          :min="1"
          :max="10"
        />
      </div>
    </div>
    <div class="notes">
      <div>
        注意：当前包裹重量为到货重量，发货前还需对包裹进行发货前处理（加固，减重等）
      </div>
      <div>合箱：请选择直接发货或者等待所有包裹到齐后选择合箱发货。</div>
      <div>分箱：包裹限重30kg，超过30kg仓库自动分拣。</div>
      <div>
        日本邮局对发货最大体积限制，长度1.5m以内，长度+（宽度+高度）X 2 = 3m
        内。
      </div>
    </div>
    <div>
      <el-button type="primary">下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          time: '2020-2-2',
          packageNum: '20061208049',
          orderNum: '20061208049',
          weight: '2578g',
          comments: '22',
          days: '22',
          fee: '22',
          status: '已入库'
        },
        {
          time: '2020-2-2',
          packageNum: '20061208049',
          orderNum: '20061208049',
          weight: '2578g',
          comments: '22',
          days: '22',
          fee: '22',
          status: '已入库'
        },
        {
          time: '2020-2-2',
          packageNum: '20061208049',
          orderNum: '20061208049',
          weight: '2578g',
          comments: '22',
          days: '22',
          fee: '22',
          status: '已入库'
        }
      ],
      radio: '',
      num: 1
    }
  }
}
</script>
<style lang="scss" scoped>
.package-type {
  margin: 20px 0;
  .type-title {
    font-size: 18px;
    font-weight: bold;
  }
  .type-radio {
    display: flex;
    align-items: center;
    height: 80px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
  }
}
.notes {
  padding: 20px 0;
}
</style>
