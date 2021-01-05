<template>
  <div class="user-container">
    <div
      :class="mobile ? 'user-mobile' : ''"
      :style="{ width: mainWidth + 'px', margin: '0 auto' }"
    >
      <div class="status-list">
        <div v-for="(item, index) in statusList" :key="index" class="list-item">
          <span>{{ item.name }}</span>
          <span class="item-total">({{ item.total }})</span>
        </div>
      </div>
      <div class="user-wrapper">
        <div v-if="!mobile" class="user-left">
          <el-menu
            :default-active="activeIndex"
            :default-openeds="defaultOpens"
            @select="handleSelect"
          >
            <el-submenu
              v-for="(item, index) in userMenu"
              :key="index"
              :index="index.toString()"
            >
              <template slot="title">
                {{ item.title }}
              </template>
              <el-menu-item
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :index="`${index}-${childIndex}`"
              >
                {{ child.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

        <div class="user-right" :style="userRightStyle">
          <div v-if="activeIndex.length > 2" class="right-link">
            <keep-alive :max="10">
              <transition name="fade">
                <router-view :key="key" />
              </transition>
            </keep-alive>
          </div>

          <div v-else>
            <div class="right-top">
              <div class="top-info">
                <div class="right-card">
                  <div class="title">会员信息</div>
                </div>
                <div class="info-detail">
                  <div>
                    <el-avatar :size="70" :src="user.avatar" />
                    <div class="detail-name">
                      <span style="font-weight: bold">
                        {{ user.name }}
                      </span>
                      <el-link icon="el-icon-edit-outline" type="primary">
                        修改
                      </el-link>
                    </div>
                  </div>
                  <div class="detail-right">
                    <div>
                      <span class="right-title">入库码</span>
                      <span style="color: #0058cb">nbjfdasfasdb</span>
                    </div>
                    <div>
                      <span class="right-title">账户余额</span>
                      <span class="right-balance">16元</span>
                      <el-button
                        type="warning"
                        round
                        size="mini"
                        @click="dialogVisible = true"
                      >
                        充值
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="info-bottom">
                  <span style="font-size: 18px">账户安全</span>
                  <div class="bottom-icon">
                    <el-image
                      v-for="(item, index) in [1, 2, 3, 4]"
                      :key="index"
                      fit="contain"
                      :src="require(`@/assets/user/${item}.png`)"
                    />
                  </div>
                </div>
              </div>
              <div class="top-notice">
                <div class="right-card">
                  <div class="title">网站公告</div>
                  <el-link type="info">更多公告 >></el-link>
                </div>
                <div
                  v-for="(item, index) in 5"
                  :key="index"
                  class="notice-list"
                >
                  <span>
                    作为转运行业中少数具备独家系统研发能力的公司
                    作为转运行业中少数具备独家系统研发能力的公司
                  </span>
                  <span>2020-03-12</span>
                </div>
              </div>
            </div>

            <div class="right-center">
              <div class="center-left">
                <div class="right-card">
                  <div class="title">包裹提醒</div>
                  <el-link type="info">全部包裹 >></el-link>
                </div>
                <div class="center-icon">
                  <div v-for="(item, index) in packageRemind" :key="index">
                    <el-badge :value="6">
                      <div class="icon-img">
                        <el-image
                          fit="contain"
                          :src="require(`@/assets/user/${item.icon}.png`)"
                        />
                      </div>
                    </el-badge>
                    <div>{{ item.name }}</div>
                  </div>
                </div>
              </div>

              <div class="center-right">
                <div class="right-card">
                  <div class="title">订单提醒</div>
                  <el-link type="info">全部订单 >></el-link>
                </div>
                <div class="center-icon">
                  <div v-for="(item, index) in orderRemind" :key="index">
                    <el-badge :value="6">
                      <div class="icon-img">
                        <el-image
                          fit="contain"
                          :src="require(`@/assets/user/${item.icon}.png`)"
                        />
                      </div>
                    </el-badge>
                    <div>{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="right-bottom">
              <div class="right-card">
                <div class="title">您的转运地址</div>
              </div>
              <warehouse />
            </div>
          </div>
        </div>
      </div>
    </div>
    <top-up :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
import { mainWidth } from '@/settings'
import { mapGetters } from 'vuex'
import Warehouse from './menu/warehouse.vue'
import TopUp from './components/top-up.vue'
export default {
  components: { Warehouse, TopUp },
  computed: {
    ...mapGetters(['mobile', 'user']),
    key() {
      return this.$route.path
    },
    packageRemind() {
      return [
        { name: '未提交', icon: '5' },
        { name: '即将超时', icon: '6' },
        { name: '超期包裹', icon: '7' },
      ]
    },
    orderRemind() {
      return [
        { name: '处理中', icon: '8' },
        { name: '未付款', icon: '9' },
        { name: '超期订单', icon: '10' },
        { name: '发出订单', icon: '11' },
      ]
    },
    // containerStyle() {
    //   let width = mainWidth + 'px'
    //   if (this.mobile) {
    //     width = '100%'
    //   }
    //   return `width:${width};`
    // },
    userRightStyle() {
      if (this.mobile) {
        return `width:100%;margin:0 auto;padding:0;display:flex;flex-warp:warp;`
      } else {
        return ''
      }
    },
    statusList() {
      return [
        { name: '未入库', total: 5 },
        { name: '已入库', total: 5 },
        { name: '待处理', total: 5 },
        { name: '未付款', total: 5 },
        { name: '已付款', total: 5 },
        { name: '邮政待发货', total: 5 },
        { name: '邮政已发货', total: 5 },
        { name: '自营审单', total: 5 },
        { name: '自营待发货', total: 5 },
        { name: '自营已发货', total: 5 },
        { name: '已签收', total: 5 },
        { name: '国内已发货', total: 5 },
        { name: '问题件', total: 5 },
      ]
    },
    userMenu() {
      return [
        {
          title: '转运管理',
          children: [
            { name: '包裹预报', link: 'reservation' },
            { name: '提交发货', link: 'consignment' },
            { name: '包裹列表', link: 'packages' },
            { name: '订单列表', link: 'orders' },
          ],
        },
        {
          title: '地址管理',
          children: [
            { name: '仓库地址', link: 'warehouse' },
            { name: '收货地址', link: 'address' },
          ],
        },
        {
          title: '增值服务',
          children: [{ name: '货到付款', link: 'cash-on-delivery' }],
        },
        {
          title: '推广奖励',
          children: [
            { name: '推广奖励', link: 'bonus' },
            { name: '我的晒单', link: '' },
          ],
        },
        {
          title: '账号管理',
          children: [
            { name: '交易管理', link: 'transaction' },
            { name: '账号设置', link: 'settings' },
            { name: '修改密码', link: 'password' },
            { name: '退出', link: 'logout' },
          ],
        },
        {
          title: '商品代购',
          children: [
            { name: '起航代购', link: '' },
            { name: '代购订单', link: '' },
          ],
        },
      ]
    },
    defaultOpens() {
      return this.userMenu.map((e, i) => i.toString())
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.findActiveIndex()
      },
      deep: true,
    },
  },
  data() {
    return {
      mainWidth,
      dialogVisible: false,
      activeIndex: '1',
    }
  },
  mounted() {
    this.findActiveIndex()
  },
  methods: {
    findActiveIndex() {
      const arr = this.$route.path.split('/')
      if (arr.length > 2) {
        this.userMenu.find((e, index) =>
          e.children.find((i, eIndex) => {
            if (i.link === arr[2]) {
              return (this.activeIndex = index + '-' + eIndex)
            }
          }),
        )
      } else {
        this.activeIndex = ''
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.navTo(this.userMenu[key[0]].children[key[2]].link)
    },
    navTo(link) {
      // const links = ['/account/forgot']
      // console.log(links.includes(link), link)
      // if (!links.includes(link)) {
      //   link = '/user/' + link
      // }
      if (link === 'logout') {
        this.$router.push('/')
        this.$store.dispatch('user/logout')
      } else {
        this.$router.push('/user/' + link)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.user-container {
  padding: 30px 0;
  background-color: #fafafa;
  .user-mobile {
    width: 100vw !important;
    .user-wrapper {
      .user-right {
        .right-top,
        .right-center,
        .right-bottom {
          flex-wrap: wrap;
          width: 100vw;
          .top-info,
          .top-notice,
          .center-left,
          .center-right {
            width: 90%;
          }
        }
      }
    }
  }
}

.status-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  .list-item {
    padding: 5px 0;
    .item-total {
      color: #ed6b6b;
    }
  }
}

.user-wrapper {
  display: flex;
  margin-top: 30px;
  .user-left {
    width: 200px;
    ::v-deep .el-submenu__title {
      color: #fff;
      background-color: #21a0e2;
      & > i {
        color: #fff;
      }
    }
    ::v-deep .is-active {
      font-size: 18px;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .user-right {
    width: calc(100% - 220px);
    padding-left: 20px;

    .right-link {
      padding: 20px;
      background-color: #fff;
    }

    .right-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #f5f5f5;
      font-size: 20px;
      color: #0058cb;
    }

    .right-top {
      display: flex;
      background-color: #fff;
      .top-info {
        width: calc(50% - 40px);
        padding: 20px;
        .info-detail {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: center;
          .detail-right {
            div:last-child {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #f5f5f5;
            }
            .right-title {
              margin-right: 20px;
              color: #999;
            }
            .right-balance {
              color: #e70c0c;
              font-weight: bold;
              margin-right: 10px;
            }
          }
        }
        .info-bottom {
          display: flex;
          margin-top: 15px;
          .bottom-icon {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 80%;
            .el-image {
              width: 25px;
              height: 20px;
            }
          }
        }
      }

      .top-notice {
        width: calc(50% - 40px);
        padding: 20px;
        .notice-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          span:first-child {
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span:last-child {
            color: #999;
          }
        }
        .notice-list + .notice-list {
          margin-top: 10px;
        }
      }
    }

    .right-center {
      display: flex;
      margin: 20px 0;
      .center-icon {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20px;
        text-align: center;
        .icon-img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          margin-bottom: 6px;
          border-radius: 100%;
          border: 1px solid #f5f5f5;
        }
        ::v-deep .is-fixed {
          top: 10px;
          right: 20px;
        }
      }

      .center-left {
        width: 40%;
        margin-right: 20px;
        padding: 20px;
        background-color: #fff;
      }

      .center-right {
        width: calc(60% - 20px);
        padding: 20px;
        background-color: #fff;
      }
    }

    .right-bottom {
      padding: 20px;
      background-color: #fff;
      .right-card {
        border: none;
      }
    }
  }
}
</style>
