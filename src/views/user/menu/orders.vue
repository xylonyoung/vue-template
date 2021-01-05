<template>
  <div>
    <div class="top">
      <el-radio-group v-model="radio">
        <el-radio :label="3">全部订单</el-radio>
        <el-radio :label="6">未支付</el-radio>
        <el-radio :label="9">待发货</el-radio>
        <el-radio :label="8">问题订单</el-radio>
      </el-radio-group>
      <el-input v-model="input" placeholder="订单号/物流单号/包裹单号/收件人">
        <i slot="prepend" class="el-icon-search" />
      </el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="success">筛选条件</el-button>
    </div>
    <div class="top-second">
      <div>
        <div>提交时间</div>
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div>
        <div>发货线路</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <div>订单状态</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <div>标记订单</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div>
      <el-table :data="list">
        <el-table-column type="selection" width="30" />
        <el-table-column label="订单详情">
          <template slot-scope="{ row }">
            <div>{{ row.time }}</div>
            <div>状态：{{ row.status }}</div>
            <div>{{ row.notes }}</div>
          </template>
        </el-table-column>
        <el-table-column label="发货单号" width="150">
          <template slot-scope="{ row }">
            <div>{{ row.orderNum }}</div>
            <div>{{ row.trackingNum }}</div>
            <el-button type="primary" size="mini">查看物流</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发货重量" width="120">
          <template slot-scope="{ row }">
            <div>重量 {{ row.weight }}g</div>
            <div>原重 {{ row.netWeight }}g</div>
            <div>运费 {{ row.freightJP }}日元</div>
            <div>（{{ row.freight }}）元</div>
          </template>
        </el-table-column>
        <el-table-column label="线路" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.line }}</div>
          </template>
        </el-table-column>
        <el-table-column label="收货人" width="100">
          <template slot-scope="{ row }">
            <div>{{ row.name }}</div>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header">
            <el-button type="danger">批量删除</el-button>
            <el-button type="primary">批量导出</el-button>
          </template>
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleCreate(row)">
              订单详情
            </el-button>
            <el-button type="text">确认收货</el-button>
            <el-button type="text">标记订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 3,
      input: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      list: [
        {
          name: '陈周丹',
          line: '速享MTE线',
          time: '2020-06-12 08:48:04',
          orderNum: '20061208049',
          trackingNum: 'EL526063580HK',
          notes: '备注内容 备注内容 备注内容',
          weight: 2578,
          netWeight: 0,
          freightJP: 3168,
          freight: 203.6,
          status: '已发货'
        },
        {
          name: '陈周丹',
          line: '速享MTE线',
          time: '2020-06-12 08:48:04',
          orderNum: '20061208049',
          trackingNum: 'EL526063580HK',
          notes: '备注内容 备注内容 备注内容',
          weight: 2578,
          netWeight: 0,
          freightJP: 3168,
          freight: 203.6,
          status: '未发货'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-radio-group {
    width: 100%;
  }
}
.top-second {
  display: flex;
  margin: 20px 0;
}
</style>
