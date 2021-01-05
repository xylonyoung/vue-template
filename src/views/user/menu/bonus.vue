<template>
  <div>
    <div class="title">推广奖励</div>
    <div class="card">
      <div>yousyun.18</div>
      <div class="point">
        <span>获取积分500</span>
        <span>推荐链接</span>
        <el-link type="primary" href="https://www.baidu.com" target="_blank">
          www.baidu.com
        </el-link>
      </div>
    </div>

    <div class="title">分享规则</div>
    <div class="card">用户通过上分的推荐链</div>
    <div>
      <el-table :data="list">
        <el-table-column label="用户名">
          <template slot-scope="{ row }">
            <div>
              {{ row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="{ row }">
            <div>
              {{ row.time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="获得积分">
          <template slot-scope="{ row }">
            <div>
              {{ row.point }}
            </div>
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
      list: [{ name: '50044j', time: '1990-11-23', point: 500 }]
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
.card {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ebeef5;
}
.point {
  margin-top: 10px;
  span:nth-child(2) {
    margin: 0 30px 0 30%;
  }
}
</style>
