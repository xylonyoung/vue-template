<!-- list just like this {type, name, options(select need), attributes}
       attributes is an object it can set all attribute -->
<template>
  <div class="querier-container">
    <div v-for="(item, index) in querierList" :key="index" class="query-item">
      <el-input
        v-if="item.type === 'input'"
        v-model="listData[item.name]"
        v-bind="
          setAttributes(item.attributes, {
            placeholder: '请输入',
            style: { width: '200px' }
          })
        "
      />
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="listData[item.name]"
        v-bind="
          setAttributes(item.attributes, {
            activeColor: '#13ce66',
            inactiveColor: '#ff4949'
          })
        "
      />
      <el-select
        v-else-if="item.type === 'select'"
        v-model="listData[item.name]"
        v-bind="item.attributes"
      >
        <el-option
          v-for="(option, optionIndex) in item.options"
          :key="optionIndex"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <el-date-picker
        v-else-if="item.type === 'date'"
        v-model="listData[item.name]"
        v-bind="
          setAttributes(item.attributes, {
            type: 'date',
            placeholder: '选择日期'
          })
        "
      />
    </div>

    <div class="query-item">
      <el-button type="primary" icon="el-icon-search" @click="confirm"
        >搜索</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    querierList: { type: Array, default: () => [] },
    querierData: { type: String, default: null }
  },
  data() {
    return { listData: {} }
  },
  watch: {
    listData: {
      handler: function(val) {
        this.fixNull(val)
        this.dataProcessor(val)
      },
      deep: true
    }
  },
  methods: {
    // fix data-picker value = null
    fixNull(data) {
      for (const key in data) {
        if (this.isTimeData(key) && data[key] === null) {
          data[key] = []
        }
      }
    },
    confirm() {
      if (haveData(this.listData)) {
        this.$emit('search')
      } else {
        this.$message.warning('请输入要搜索的内容')
      }
      function haveData(data) {
        let counter = 0
        for (const key in data) {
          if (data[key]) {
            counter++
          }
        }
        return !!counter
      }
    },
    setAttributes(val, defVal) {
      if (val) {
        return Object.assign(defVal, val)
      } else {
        return defVal
      }
    },
    isTimeData(key) {
      return !/\./.test(key) && /Time/.test(key)
    },
    dataProcessor(data) {
      let result = ''
      const tempArr = []
      for (const key in data) {
        if (this.isTimeData(key)) {
          timeFormat(key, data[key])
        } else {
          dataFormat(key, data[key])
        }
      }
      result = joinData(tempArr)
      this.$emit('update:querierData', result)

      function joinData(arr) {
        return arr.join(' && ')
      }
      function dataFormat(key, data) {
        let result = 'entity'
        const keys = key.split('.')
        keys.forEach(e => {
          result += `.get${toUpperCase(e)}()`
        })
        result += ` == ${data}`
        tempArr.push(result)
      }
      function timeFormat(key, data) {
        if (data[0]) {
          tempArr.push(
            `entity.get[${key}]() >= datetime.get('${dateFormat(data[0])}')`
          )
        }
        if (data[1]) {
          tempArr.push(
            `entity.get[${key}]() <= datetime.get('${dateFormat(
              getTomorrow(data[1])
            )}')`
          )
        }
      }
      function getTomorrow(date) {
        const today = new Date(date)
        return new Date(today.setDate(today.getDate() + 1))
      }
      function dateFormat(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
      function toUpperCase(str) {
        if (str[0]) {
          return str.replace(str[0], str[0].toUpperCase())
        } else {
          return ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.querier-container {
  display: flex;
  align-items: center;
  .query-item + .query-item {
    margin-left: 10px;
  }
}
</style>
