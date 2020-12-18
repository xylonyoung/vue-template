<template>
  <div class="main-container">
    <div class="product" :class="mobile ? '' : 'product-grid'">
      <div v-for="(item, index) in list" :key="index" class="item">
        <el-image
          style="width: 250px; height: 200px"
          :src="item.images[0]"
          fit="fill"
        ></el-image>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="pagination">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['mobile']),
  },
  data() {
    return {
      currentPage: 1,
      list: [],
    }
  },
  created() {
    this.$api.list.get().then(res => {
      const { data } = res
      this.list = data
      console.log(this.list)
    })
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
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  place-items: center;
}
.product {
  width: 100%;
  .item {
    width: 100%;
    padding: 20px;
    text-align: center;
    .name {
      margin: 10px 0;
    }
  }
}
.pagination {
  text-align: center;
  padding-bottom: 20px;
}
</style>