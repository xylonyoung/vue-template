<template>
  <div class="packages-container">
    <div class="package">
      <div class="card-title">
        <span>包裹详情</span>
        <span>订单号：14153531313</span>
      </div>
      <div class="card">
        <div>
          <span>所属仓库：日本邮政仓</span>
          <span style="margin-left: 30px">重量合计：0g</span>
        </div>
        <div>包裹单号：20061208049</div>
        <div>备注：鞋子 玩具6个</div>
      </div>
    </div>

    <div class="product">
      <div class="card-title">
        <span>商品详情</span>
      </div>
      <div class="card">
        <el-table :data="list">
          <el-table-column label="商品名称">
            <template slot-scope="{ row }">
              <div>{{ row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="商品数量">
            <template slot-scope="{ row }">
              <div>{{ row.quantity }}</div>
            </template>
          </el-table-column>
          <el-table-column label="商品单价">
            <template slot-scope="{ row }">
              <div>{{ row.price }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="product-selector">
          <span>选择线路</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span>点击查看各线路详细介绍</span>
        </div>
        <div class="product-selector">
          <span>选择发货区域</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span>默认中国，如有其他发货区域请选择</span>
        </div>
      </div>

      <div class="waybill">
        <div class="card-title">
          <span>运单1</span>
        </div>
        <div class="card">
          <div>
            <div class="card-title">
              <span>申报模板</span>
            </div>
            <div class="card">
              <el-table :data="list">
                <el-table-column label="分类">
                  <template slot-scope="{ row }">
                    <div>{{ row.name }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="{ row }">
                    <div>{{ row.quantity }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="{ row }">
                    <div>{{ row.price }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="waybill-insurance">
            <div>
              <span>申报价值：200日元</span>
              <el-checkbox v-model="checked">
                需要购买 0日元（当前线路不支持购买保险）
              </el-checkbox>
            </div>
            <div>
              <el-button type="text">保存申报</el-button>
            </div>
          </div>
          <div>
            您申报价值已超过1000元人民币，可能会被海关收取关税或退运，请您注意！
          </div>
          <div class="waybill-btn">
            <el-button type="primary" @click="dialogVisible = true">
              点击选择收货地址
            </el-button>
          </div>
          <div class="waybill-address">
            <div>姓名：张三李四</div>
            <div>电话：12345678901</div>
            <div>地址：中国 广东省 江门市 江海区 高新西路清澜路33号</div>
          </div>
        </div>
      </div>

      <div class="services">
        <div class="card-title">选择增值服务</div>
        <div class="card">
          <el-table :data="addressList">
            <el-table-column type="selection" width="55" />
            <el-table-column label="增值名称" width="100">
              <template slot-scope="{ row }">
                <div>{{ row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="费用" width="120">
              <template slot-scope="{ row }">
                <div>{{ row.phone }}</div>
              </template>
            </el-table-column>
            <el-table-column label="优惠券">
              <template slot-scope="{ row }">
                <div>{{ row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="增值服务描述">
              <template slot-scope="{ row }">
                <div>{{ row.address }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="packaging">
        <div class="card-title">包装说明</div>
        <div class="card">备注说明100字内</div>
      </div>

      <div class="payment">
        <div class="card-title">选择支付方式</div>
        <div>支付方式：自动支付需保证账户余额充足，余额不足将转为手动支付</div>
        <div>
          <el-button type="primary">手动支付</el-button>
          <el-button type="success">自动支付</el-button>
        </div>
      </div>

      <div class="submit-btn">
        <el-button type="primary">提交发货</el-button>
      </div>

      <el-dialog :visible.sync="dialogVisible" width="50%">
        <div class="address">
          <div class="address-search">
            <el-input />
            <el-button type="primary">搜索</el-button>
            <el-button type="success">添加地址</el-button>
            <el-button type="primary">刷新</el-button>
          </div>
          <el-table :data="addressList">
            <el-table-column label="姓名" width="100">
              <template slot-scope="{ row }">
                <div>{{ row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="电话" width="120">
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
              <template slot-scope="{ row }">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleCreate(row)"
                >
                  选择
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="address-pagination">
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
        <span slot="footer">
          <el-button type="primary" @click="dialogVisible = false">
            关闭
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      list: [
        { name: '鞋子', quantity: 3, price: 3 },
        { name: '鞋子', quantity: 3, price: 3 },
        { name: '鞋子', quantity: 3, price: 3 },
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      checked: true,
      addressList: [
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号',
        },
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号',
        },
        {
          name: '张三李四',
          phone: '12345678901',
          address: '中国 广东省 江门市 江海区 高新西路清澜路33号',
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
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}
.card {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ebeef5;
}
.product {
  .product-selector {
    margin-top: 30px;
    span:first-child {
      margin-right: 20px;
    }
    span:last-child {
      margin-left: 20px;
    }
  }
}
.waybill {
  .waybill-insurance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-checkbox {
      margin-left: 40px;
    }
  }
  .waybill-btn {
    margin-top: 30px;
  }
  .waybill-address {
    margin: 10px 0;
  }
}
.address {
  .address-search {
    display: flex;
    .el-input {
      width: 30%;
    }
    button:nth-child(2) {
      margin-left: 20px;
    }
  }
  .address-pagination {
    margin-top: 20px;
  }
}
.payment {
  div:nth-child(2) {
    margin-bottom: 10px;
  }
}
.submit-btn {
  margin-top: 30px;
}
</style>
