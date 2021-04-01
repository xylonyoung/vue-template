<template>
  <el-dialog
    append-to-body
    :title="title"
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-steps :space="200" :active="currentStep" finish-status="success" simple>
      <el-step title="上传" />
      <el-step title="数据校验" />
    </el-steps>

    <div v-if="currentStep === 0" class="upload">
      <el-upload
        v-loading="uploadLoading"
        :http-request="function () {}"
        :before-upload="beforeUpload"
        :limit="1"
        :show-file-list="false"
        action="/"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将填写后的文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-button type="primary" style="margin-top: 20px" @click="createTemplate">下载模板</el-button>
    </div>

    <div v-if="currentStep === 1">
      <!-- 错误显示表 -->
      <template v-if="errorTableData.length">
        <h1 style="color: #f56c6c">错误信息展示</h1>

        <el-table
          :data="errorTableData"
          border
          class="import-error-table"
          style="width: 100%"
        >
          <el-table-column label="错误行号" prop="row" width="180" />
          <el-table-column label="错误原因" prop="reason" />
        </el-table>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import XLSX from 'xlsx'
import Schema from 'async-validator'
export default {
  props: {
    // 请求方法
    requestFn: {
      type: Function,
      required: true
    },
    // 导入字段
    fields: {
      type: Object,
      required: true
    },
    // 是否显示弹窗
    visible: {
      type: Boolean,
      required: true
    },
    // 标题
    title: {
      type: String,
      default: '表格导入'
    },
    // 增加附加数据
    append: {
      type: Object,
      default: () => ({})
    },
    // 提示信息，数组
    tips: {
      type: Array,
      default: () => []
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 格式化数据
    formatter: {
      type: Object,
      default: () => ({}),
      validator(formatter) {
        for (const key in formatter) {
          if (!(formatter[key] instanceof Object)) {
            // eslint-disable-next-line
            console.error(`${key}的值必须为 对象 或 函数`)
            return false
          }
        }
        return true
      }
    },
    // 弹窗宽度
    dialogWidth: {
      type: String,
      default: '80%'
    }
  },
  data() {
    return {
      currentStep: 0,
      tableData: [],
      columns: [],
      uploadLoading: false,
      tableLoading: false,
      fileList: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    errorTableData() {
      const errorData = this.errorData
      const errorTableData = []
      for (const index in errorData) {
        const messageArr = []
        for (const field in errorData[index]) {
          messageArr.push(errorData[index][field])
        }
        errorTableData.push({
          row: Number(index) + 1,
          reason: messageArr.join('、')
        })
      }

      return errorTableData
    }
  },
  methods: {
    goPre() {
      this.currentStep--
    },
    goNext() {
      this.currentStep++
    },
    createTemplate() {
      const filename = `${this.title}.xlsx`
      const workbook = XLSX.utils.book_new()
      const ws1 = XLSX.utils.table_to_sheet(document.getElementById('table1'))
      XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet1')
      XLSX.writeFile(workbook, filename) // 导出Excel
    },
    // 初始化数据
    initData() {
      this.tableData = []
      this.columns = []
      this.currentStep = 0
    },
    // 关闭
    handleClose() {
      this.initData()
      this.$emit('update:visible', false)
    },
    // 检测文件类型
    checkType(file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      const extArr = ['xlsx', 'xls', 'csv']
      return extArr.includes(fileExt)
    },
    // 上传错处提示
    uploadError(message) {
      this.$notify.error({
        title: '上传出错了',
        message
      })
    },
    // 检测表头
    checkTableTitle(columns, fields) {
      const titles = Object.values(fields)
      let pass = true
      titles.forEach((item) => {
        if (!columns.includes(item)) {
          pass = false
          this.$notify.error({
            title: '数据错处',
            message: item + ' 列未找到'
          })
        }
      })
      return pass
    },
    handleGoNext() {
      this.$notify.error({
        title: '提示',
        message: '请先上传数据'
      })
    },
    // 改变 tableData 的 key, 并且过滤掉不需要的字段
    changeDataKeyAndFilter(arr) {
      const fields = this.fields
      return arr.map((item) => {
        const res = {}
        for (const key in fields) {
          res[key] = item[fields[key]]
        }
        return res
      })
    },
    async beforeUpload(file) {
      if (this.uploadLoading) return

      // 检测文件类型
      if (!this.checkType(file)) {
        this.uploadError(
          '文件：' + file.name + ' 文件类型错误，请在模板文件上修改后上传'
        )
        return false
      }

      this.uploadLoading = true

      try {
        const { columns, tableData } = await this.excel(file)
        if (!(columns.length && tableData.length)) {
          this.uploadError('请打开模板文件, 并填写数据')
        } else if (this.checkTableTitle(columns, this.fields)) {
          this.columns = columns
          this.tableData = tableData
          this.goNext()
          this.validateData()
        } else {
          return
        }
      } catch (e) {
        // eslint-disable-next-line
        console.error(e)
        this.uploadError('文件读取出错，请重新上传')
      } finally {
        this.uploadLoading = false
      }
      return false
    },
    // 获取标题行
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        var hdr = 'UNKNOWN ' + C
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 获取数组
    getArrData(excelData) {
      const workbook = XLSX.read(excelData, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const columns = this.getHeaderRow(worksheet)
      const tableData = XLSX.utils.sheet_to_json(worksheet)
      return {
        columns: allTrim(columns, true),
        tableData: allTrim(tableData, true)
      }

      function allTrim(data, isTrimKey) {
        const type = Object.prototype.toString.call(data)
        if (type === '[object String]') {
          // 普通字符串
          data = data.trim()
        } else if (type === '[object Array]') {
          // 数组
          data = data.map((item) => allTrim(item, isTrimKey))
        } else if (type === '[object Object]') {
          // 对象
          for (let key in data) {
            // 是否去除 key 的空格
            if (isTrimKey && typeof key === 'string' && key !== key.trim()) {
              data[key.trim()] = data[key]
              delete data[key]
              key = key.trim()
            }
            // 递归
            data[key] = allTrim(data[key], isTrimKey)
          }
        }
        return data
      }
    },
    excel(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onerror = (e) => {
          reject(e)
        }
        reader.onload = (e) => {
          const excelData = e.target.result
          const arrData = this.getArrData(excelData)
          resolve(arrData)
        }
      })
    },
    // 检查单元格是否错误
    checkCell({ row, column, rowIndex }) {
      if (
        this.errorData[rowIndex] &&
        this.errorData[rowIndex][column.property]
      ) {
        return 'ele-import-error-cell'
      }
    },
    // 校检数据
    validateData() {
      if (this.rules) {
        var validator = new Schema(this.rules)
        const errorData = []
        this.tableData.forEach((item, index) => {
          validator.validate(item, (errors, fileds) => {
            if (errors) {
              errorData[index] = []
              errors.forEach((error) => {
                errorData[index][error.field] = error.message
              })
            }
          })
        })
        console.log(errorData)
        this.errorData = errorData
      }
    },
    // 根据value找到key
    findKey(obj, value, compare = (a, b) => a === b) {
      let key = Object.keys(obj).find((k) => compare(obj[k], value))
      if (!isNaN(Number(key))) {
        key = Number(key)
      }
      return key
    },
    // 根据 formatter 改变值
    changeData(tableData) {
      const formatter = this.formatter
      if (formatter) {
        tableData = tableData.map((item) => {
          for (const key in item) {
            if (formatter[key]) {
              if (typeof formatter[key] === 'function') {
                item[key] = formatter[key](item[key], item)
              } else {
                item[key] = this.findKey(formatter[key], item[key])
              }
            }
          }
          return item
        })
      }

      return tableData
    },
    // 发送请求
    async handleRequest() {
      if (this.tableLoading) return
      if (this.errorTableData.length) {
        this.$notify.error({
          title: '提示',
          message: '请处理完错误后重新上传'
        })
        return
      }

      this.tableLoading = true
      let tableData = [...this.tableData]
      // 改变值
      tableData = this.changeData(tableData)
      // 增加附加数据
      const appendData = this.append
      if (appendData) {
        tableData = tableData.map((item) => {
          return Object.assign({}, item, appendData)
        })
      }
      try {
        await this.requestFn(tableData)
        this.$message.success('导入成功')
      } catch (error) {
        this.errorData = error
        this.$message.error('导入失败, 请重试')
      } finally {
        this.tableLoading = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.upload {
  margin: 20px;
  text-align: center;
}
.import-error-table {
  margin-bottom: 20px;
}

.ele-import-error-cell {
  color: white;
  background: #f56c6c !important;
}
.ele-import-error-cell:hover {
  background-color: #f56c6c !important;
  background: #f56c6c !important;
}
</style>
