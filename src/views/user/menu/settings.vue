<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="a">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />个人信息</span>
            <span>编辑个人信息</span>
            <el-button type="text">编辑</el-button>
          </div>
        </template>
        <information />
      </el-collapse-item>

      <el-collapse-item name="b">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />登录密码</span>
            <span>
              互联网账号存在被盗风险，建议您定期更改密码以保护账户安全
            </span>
            <el-button type="text">编辑</el-button>
          </div>
        </template>
        <password />
      </el-collapse-item>

      <el-collapse-item name="c">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />身份认证</span>
            <span>待审核</span>
            <el-button type="text">编辑</el-button>
          </div>
        </template>
        <id-card />
      </el-collapse-item>

      <el-collapse-item name="d">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />手机验证</span>
            <span>
              你尚未验证手机，将无法使用手机登录及接受通知等功能，请尽快进行验证！
            </span>
            <el-button type="text">验证</el-button>
          </div>
        </template>
        <phone />
      </el-collapse-item>

      <el-collapse-item name="e">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />邮箱验证</span>
            <span>
              你尚未验证邮箱，将无法使用邮箱登录及接受通知等功能，请尽快进行验证！
            </span>
            <el-button type="text">验证</el-button>
          </div>
        </template>
        <email />
      </el-collapse-item>

      <el-collapse-item name="f">
        <template slot="title">
          <div class="row">
            <span><i class="el-icon-warning" />微信绑定</span>
            <span>微信未绑定</span>
            <el-button type="text">绑定</el-button>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Email from '../components/email.vue'
import IdCard from '../components/id-card.vue'
import Information from '../components/information.vue'
import Password from '../components/password.vue'
import Phone from '../components/phone.vue'
export default {
  components: { Information, IdCard, Password, Phone, Email },
  data() {
    return { activeName: '' }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  i {
    margin-right: 10px;
    font-size: 30px;
    color: #e6a23c;
  }
  span {
    font-size: 18px;
  }
  span:first-child {
    display: flex;
    align-items: center;
  }
}
::v-deep .el-collapse-item__content {
  padding: 25px;
}
</style>
