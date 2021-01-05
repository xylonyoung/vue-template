<template>
  <div class="warehouse-container">
    <div class="detail-top">
      <el-image
        fit="contain"
        style="width: 30px; height: 20px"
        :src="require('@/assets/temp/jp.png')"
      ></el-image>
      <span>日本邮政仓库</span>
      <span>(在日本网站购物时，请使用以下地址)</span>
    </div>
    <div class="detail-center">
      <i class="el-icon-location-outline center-icon"></i>
      <div class="center-location">
        <div>
          日文地址：東京都板橋区板橋４-４-３白鳩Ｍ３Ｆ（株）大啓商事 VNIKAI
        </div>
        <div>
          英文地址：VNIKAI,Daikeishouji Co., Ltd Shirohato Manshon#3F,4-4-3
          Itabashi,Itabashi-ku,Tokyo，Japan
        </div>
      </div>
      <i class="el-icon-message center-icon"></i>
      <div class="center-phone">
        <div>
          <span>邮编： 173-0004</span>
          <i class="el-icon-document-copy detail-icon"></i>
        </div>
        <div>
          <span>电话： 03-6915-5876</span>
          <i class="el-icon-document-copy detail-icon"></i>
        </div>
        <div>
          <span>入库码：</span>
          <span class="phone-code">VNIKAI</span>
          <i class="el-icon-document-copy detail-icon"></i>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="bottom-title">日本购物网站收货地址填写参考：</div>
      <el-form
        inline
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
      >
        <div class="form-grid">
          <el-form-item label="姓：">
            <el-input
              v-model="formData.name"
              placeholder="可写汉字或拼音"
            ></el-input>
          </el-form-item>
          <el-form-item label="名：">
            <el-input
              v-model="formData.name"
              placeholder="可写汉字或拼音"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-grid">
          <el-form-item label="セ イ（日文姓）：">
            <div class="item-flex">
              <el-input
                v-model="formData.name"
                placeholder="请用“中译日”转换"
              ></el-input>
              <el-button type="text" class="item-margin">中译日</el-button>
            </div>
          </el-form-item>
          <el-form-item label="メ イ（日文名）：">
            <div class="item-flex">
              <el-input
                v-model="formData.name"
                placeholder="请用“中译日”转换"
              ></el-input>
              <el-button type="text" class="item-margin">中译日</el-button>
            </div>
          </el-form-item>
        </div>
        <div class="form-warning" style="margin: 0 0 22px 150px">
          *货到付款包裹必须按照规定填写收件人姓名，普通包裹建议填写信用卡姓名作为收件人。日亚可使用“大啓商事”作为收件人姓名。
        </div>
        <div class="form-grid">
          <el-form-item label="郵便番号：">
            <div class="item-flex">
              <el-input v-model="formData.name"></el-input>
              <i class="el-icon-document-copy detail-icon item-margin"></i>
            </div>
          </el-form-item>
          <el-form-item label="電話番号：">
            <div class="item-flex">
              <el-input v-model="formData.name"></el-input>
              <i class="el-icon-document-copy detail-icon item-margin"></i>
            </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="都道府県：">
            <div class="item-flex">
              <el-input v-model="formData.name"></el-input>
              <i class="el-icon-document-copy detail-icon item-margin"></i>
            </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="市区町村：">
            <el-input v-model="formData.name" style="width: 700px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="番地/建筑名/ビ ル：">
            <div class="item-flex">
              <el-input v-model="formData.name"></el-input>
              <div class="form-warning" style="width: 400px; margin-left: 10px">
                *如果没有此项请将入库码填写到地址最后
              </div>
            </div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="注意事项：" class="form-notice">
            <div>
              仓库地址仅限于起航转运用户在日本网站进行购物收货使用，请勿使用仓库地址作为开店联系地址及其它非法用途，一经发现将永久封号并冻结没收在库商品、账户余额，并保留追究相关责任人的权利。
            </div>
          </el-form-item>
        </div>
        <!-- <div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </div> -->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      rules: {}
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.warehouse-container {
  margin: 0 10px;
  border: 1px solid #f2f2f2;
}
.detail-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 22px;
  color: #2355f5;
  background-color: #e7f1fe;
  border-radius: 100%;
  overflow: hidden;
}
.detail-top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  span:nth-child(2) {
    margin: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  span:last-child {
    color: #999;
  }
}

.detail-center {
  display: grid;
  grid-template-columns: 40px calc(100% - 40px);
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
  .center-icon {
    font-size: 25px;
    color: #ff0000;
  }
  .center-location {
    div:last-child {
      color: #999;
    }
  }
  .center-phone {
    display: flex;
    div + div {
      margin-left: 30px;
    }
    div {
      display: flex;
      align-items: center;
      i:last-child {
        margin-left: 10px;
      }
    }
    .phone-code {
      font-weight: bold;
      color: #ff0000;
    }
  }
}
.detail-bottom {
  .bottom-title {
    padding: 20px;
    font-size: 20px;
    color: #999;
  }
  .form-grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .item-flex {
    display: flex;
    align-items: center;
    .item-margin {
      margin-left: 10px;
    }
  }
  .form-warning {
    font-size: 12px;
    color: red;
  }
  .form-notice {
    ::v-deep .el-form-item__content {
      width: 70%;
      color: #999;
    }
  }
}
</style>
