<template>
  <div>
    <div class="detail">
      <div>
        <div>yousyunn.18</div>
        <div>入库码：MTQNDE</div>
        <div>会员等级：普通会员</div>
      </div>
      <div>
        <span>人民币账户余额：0.00元</span>
        <el-button type="primary" @click="dialogVisible = true">充值</el-button>
      </div>
      <div>
        <div>等级积分：595</div>
        <div>消费积分：0</div>
        <div>100积分=1元</div>
      </div>
    </div>

    <div class="list">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="交易记录" name="first">
          <div>
            <el-table :data="list">
              <el-table-column label="交易号">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.number }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作时间">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.time }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="确认时间">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.confirmTime }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="类别">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.type }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.status }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="金额">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.amount }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="账户动作">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.actions }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="{ row }">
                  <el-button type="text" @click="handleClick(row)">
                    查看详情
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
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="second">充值记录</el-tab-pane>
      </el-tabs>
    </div>
    <top-up :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
import topUp from '../components/top-up.vue'
export default {
  components: { topUp },
  data() {
    return {
      currentPage: 1,
      dialogVisible: false,
      activeName: 'first',
      list: [
        {
          number: 123456,
          time: '2020-10-10 10:10:10',
          confirmTime: '2020-10-10 10:10:10',
          type: '订单扣款',
          status: '已完成',
          amount: -213.77,
          actions:
            '本次支付：订单2012412消费21人民币、消费积分***，支付后余额是0元人民币'
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
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: space-evenly;
  font-size: 18px;
  line-height: 200%;
  .el-button {
    margin-left: 20px;
  }
}
.list {
  margin-top: 30px;
}
.pagination {
  margin-top: 20px;
}
</style>
