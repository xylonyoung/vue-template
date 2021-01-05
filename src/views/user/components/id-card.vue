<template>
  <div>
    <el-upload action="#" list-type="picture-card" :auto-upload="false">
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <div class="tips">
      <div>无身份证用户请上传其他有效身份证明（如护照等）</div>
      <div>
        身份验证是因为《日本防止犯罪转移法》及中国国内海关清关要求，请您务必如实上传真实有效的身份信息。我们尊重并保护您的隐私，您上传的信息受法律保护。
      </div>
    </div>
    <div>
      <el-button type="success">确认上传</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-upload {
  margin-top: 20px;
}
.tips {
  width: 60%;
  padding: 20px 0;
}
</style>
