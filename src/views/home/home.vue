<template>
  <div class="home-container" :class="mobile ? 'home-mobile' : ''">
    <el-carousel>
      <el-carousel-item v-for="item in 3" :key="item">
        <el-image
          :src="require('@/assets/temp/carousel.png')"
          fit="fit"
          style="width: 100%; height: 100%"
        ></el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="track">
      <div class="track-wrapper">
        <div class="track-input">
          <el-input
            placeholder="请输入您要查询的单号"
            v-model="trackData"
          ></el-input>
          <el-button type="warning">物流查询</el-button>
        </div>
        <div class="news">
          <div class="top">
            <span class="title">最新公告</span>
            <el-link type="info">更多公告 >></el-link>
          </div>
          <div v-for="(item, index) in 5" :key="index" class="news-list">
            <span>
              作为转运行业中少数具备独家系统研发能力的公司
              作为转运行业中少数具备独家系统研发能力的公司
            </span>
            <span>2020-03-12</span>
          </div>
        </div>
      </div>
      <div class="track-wrapper">
        <div class="track-input">
          <el-input
            placeholder="请输入您要查询的"
            v-model="trackData"
          ></el-input>
          <el-button type="primary">运费查询</el-button>
        </div>
        <div class="news">
          <div class="top">
            <span class="title">日淘教程</span>
            <el-link type="info">更多教程 >></el-link>
          </div>
          <div v-for="(item, index) in 5" :key="index" class="news-list">
            <span>作为转运行业中少数具备独家系统研发能力的公司</span>
            <span>2020-03-12</span>
          </div>
        </div>
      </div>
    </div>

    <div class="agency">
      <div class="title">起航一键代购</div>
      <div class="search">
        <el-input placeholder="输入商品链接，提交起航代买" v-model="trackData">
          <template slot="prepend">商品链接</template>
          <el-button type="primary" slot="append">提交</el-button>
        </el-input>
      </div>
      <div class="title">海淘转运流程</div>
      <div class="agency-flow">
        <div v-for="(item, index) in agencyFlow" :key="index" class="flow-item">
          <div class="item-img">
            <div class="img-name">{{ item.name }}</div>
            <el-image :src="item.img" fit="fill"></el-image>
          </div>
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div class="reviews">
      <div class="title">海淘晒单</div>
      <div class="reviews-flow">
        <div v-for="(item, index) in agencyFlow" :key="index" class="flow-item">
          <div class="item-img" :class="index === 0 ? 'item-img-detail' : ''">
            <div class="img-detail" v-if="index === 0">
              <div class="detail-title">{{ item.name }}</div>
              <div>
                {{ item.name }}
              </div>
              <div>
                {{ item.name }}
              </div>
            </div>
            <el-image :src="item.img" fit="fill"></el-image>
          </div>
        </div>
      </div>
    </div>

    <div class="recommend">
      <div class="title">商家推荐</div>
      <div class="recommend-list">
        <div class="list-title">
          <span>商家推荐</span>
        </div>
        <div class="list-img">
          <div
            v-for="(item, index) in recommendList"
            :key="index"
            class="img-item"
          >
            <el-image
              :src="require('@/assets/temp/' + item)"
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
    </div>

    <div class="links">
      <div class="links-title">友情链接</div>
      <div class="links-list">
        <a
          v-for="(item, index) in friendlyLinks"
          :key="index"
          :href="item.link"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['language', 'mobile', 'token']),
    agencyFlow() {
      return [
        {
          name: '注册会员',
          title: '获得您的专属转运地址',
          img: require('@/assets/home/register.png')
        },
        {
          name: '海外网站购物',
          title: '签收货物，商品安全迅速到达您手中',
          img: require('@/assets/home/shopping.png')
        },
        {
          name: '等待收货',
          title: '签收货物，商品安全迅速到达您手中',
          img: require('@/assets/home/sign.png')
        },
        {
          name: '转运网站操作',
          title: '提交运单 包裹发往国内 ',
          img: require('@/assets/home/transshipment.png')
        }
      ]
    }
  },
  data() {
    return {
      trackData: '',
      recommendList: ['03.jpg', '04.jpg', '05.jpg', '06.jpg'],
      friendlyLinks: [
        { name: 'Amazon', link: 'https://www.amazon.com/' },
        { name: 'Apple', link: 'https://www.apple.com/' },
        { name: 'Bing', link: 'https://www.bing.com/' },
        { name: '百度', link: 'https://www.baidu.com/' }
      ]
    }
  },
  methods: {
    navTo(link) {
      if (link === 'register') {
        this.$router.push({
          path: 'login',
          query: {
            active: 'register'
          }
        })
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin blockPadding {
  padding: 30px 0;
}
.title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}

.home-mobile {
  ::v-deep .el-carousel__container {
    height: 150px;
  }

  .track {
    display: block;
    .track-wrapper {
      width: 90%;
      padding: 0 5%;
    }
  }

  .agency {
    .search {
      width: 100%;
      transform: scale(0.9);
    }
    .agency-flow {
      flex-wrap: wrap;
      .flow-item + .flow-item {
        margin: 20px 0 0;
      }
    }
  }

  .reviews {
    .reviews-flow {
      flex-wrap: wrap;
      .flow-item + .flow-item {
        margin: 20px 0 0;
      }
    }
  }

  .recommend {
    .recommend-list {
      flex-wrap: wrap;
      .list-title {
        display: none;
      }
    }
    .list-img {
      flex-wrap: wrap;
      .img-item + .img-item {
        margin: 20px 0 0;
      }
    }
  }
}

.el-carousel {
  margin-top: 30px;
  .el-carousel__container {
    height: 300px;
  }
}

.track {
  width: 100%;
  @include blockPadding;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .track-wrapper {
    width: 450px;
  }
  .track-input {
    display: flex;
    .el-button--warning {
      background-color: #f37709;
      border-color: #f37709;
    }
  }
  .news {
    margin-top: 20px;
    .top {
      margin-bottom: 10px;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #c1bfc0;
      .title {
        position: relative;
        padding-left: 15px;
        font-size: 18px;
        font-weight: bold;
        &:before {
          content: '';
          position: absolute;
          height: 18px;
          top: 0;
          left: 0;
          border-left: 5px solid #f37709;
          transform: translate3d(0, 4px, 0);
        }
      }
    }
    .news-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .news-list + .news-list {
      margin-top: 10px;
    }
  }
}

.agency {
  @include blockPadding;
  background-color: #fafafa;
  .search {
    width: 700px;
    margin: 20px auto 30px auto;
    ::v-deep .el-input-group__prepend,
    ::v-deep .el-input-group__append {
      font-size: 16px;
      color: #fff;
      background-color: #307be1;
      border-color: #307be1;
    }
    ::v-deep .el-input__inner {
      border: 2px solid #307be1;
    }
  }
  .agency-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 20px 0;
    .flow-item + .flow-item {
      margin-left: 20px;
    }
    .item-img {
      position: relative;
      width: 250px;
      height: 200px;
      margin-bottom: 10px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 9;
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
      .img-name {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: #fff;
        z-index: 9;
      }
    }
  }
}
.reviews {
  @include blockPadding;
  .reviews-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .flow-item + .flow-item {
      margin-left: 20px;
    }
    .item-img-detail {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 9;
      }
      .img-detail {
        position: absolute;
        top: 10%;
        left: 10%;
        color: #fff;
        z-index: 9;
        .detail-title {
          font-size: 18px;
          margin-bottom: 10px;
        }
      }
    }
    .item-img {
      width: 250px;
      height: 200px;
      margin-bottom: 10px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.recommend {
  @include blockPadding;
  background-color: #fafafa;
  .recommend-list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 30px;
    .list-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 80px;
      height: 80px;
      font-size: 20px;
      letter-spacing: 10px;
      padding-left: 10px;
      color: #fff;
      background-color: #1d66e4;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 90%;
        border: 1px solid #fff;
        transform: translate(4%, 4%);
      }
    }
    .list-img {
      display: flex;
      justify-content: center;
      align-items: center;
      .img-item {
        width: 270px;
        height: 90px;
        border: 1px solid #ececec;
      }
    }
  }
}
.links {
  @include blockPadding;
  width: 90%;
  padding-left: 10%;
  .links-title {
    font-size: 20px;
    font-weight: bold;
  }
  .links-list {
    margin-top: 10px;
    a + a {
      margin-left: 20px;
    }
    & > a {
      text-decoration: none;
    }
  }
}
</style>
