<template>
  <div class="querier-container">
    <div v-for="(item, index) in querierConfig" :key="index" class="query-item">
      <el-input
        v-if="item.type === 'input'"
        v-model="queryData[item.name]"
        v-bind="setProperties(item)"
        @keyup.enter.native="confirm"
      />

      <el-input
        v-else-if="item.type === 'comparison'"
        v-model="queryData[item.name][0]"
        class="comparison"
        v-bind="setProperties(item)"
        @keyup.enter.native="confirm"
      >
        <el-select slot="prepend" v-model="queryData[item.name][1]">
          <el-option label="等于" value="==" />
          <el-option label="大于" value=">" />
          <el-option label="小于" value="<" />
          <el-option label="大于或等于" value=">=" />
          <el-option label="小于或等于" value="<=" />
        </el-select>
      </el-input>

      <div v-else-if="item.type === 'range'" class="rangeInput">
        <el-input
          v-model="queryData[item.name][0]"
          v-bind="setProperties(item)"
          @keyup.enter.native="confirm"
        />
        <i class="el-icon-minus" />
        <el-input
          v-model="queryData[item.name][1]"
          v-bind="setProperties(item)"
          @keyup.enter.native="confirm"
        />
      </div>

      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="queryData[item.name]"
        v-bind="setProperties(item)"
      />

      <el-select
        v-else-if="item.type === 'select'"
        v-model="queryData[item.name]"
        v-bind="setProperties(item)"
        clearable
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
        v-model="queryData[item.name]"
        v-bind="setProperties(item)"
      />

      <slot
        v-else-if="item.type === 'slot'"
        :name="item.name"
        :value="queryData[item.name]"
      />
    </div>

    <div class="query-item">
      <el-button type="primary" icon="el-icon-search" @click="confirm">
        搜索
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  /**
   * @description querier is for create query data
   * @example <querier :querier-config="querierConfig"
   *            :querier-data.sync="querierData" @confirm="getList">
   *          <template v-slot:name><div /></template>
   *          </template>
   */
  props: {
    /**
     * @property {String} type input, comparison, switch, select, date, range and slot
     * @property {String} name just like Object syntax (e.g. object.key.key)
     * @property {Any} default set default value
     * @property {Array} options for select option
     * @property {Object} properties set element's property and attribute
     */
    querierConfig: { type: Array, default: () => [] },
    /**
     * querierData will be return to father
     * @return {String}
     */
    querierData: { type: String, default: null }
  },
  data() {
    return { queryData: {}, secondData: {}}
  },
  created() {
    this.checkConfig()
  },
  methods: {
    checkConfig() {
      let haveDefault = false
      this.querierConfig.forEach(e => {
        if (e.default) {
          this.$set(this.queryData, e.name, e.default)
          haveDefault = true
        }
        // data need reactive
        if (e.type === 'comparison') {
          this.$set(this.queryData, e.name, [null, '=='])
        } else if (e.type === 'range') {
          this.$set(this.queryData, e.name, [null, null])
        }
      })
      if (haveDefault) {
        this.confirm()
      }
    },

    setProperties(item) {
      if (item.properties) {
        return Object.assign(defaultProps(), item.properties)
      } else {
        return defaultProps()
      }

      function defaultProps() {
        switch (item.type) {
          case 'input':
            return {
              style: { width: '150px' }
            }
          case 'comparison':
            return {
              style: { width: '250px' }
            }
          case 'range':
            return {
              style: { width: '100px' }
            }
          case 'switch':
            return {
              activeColor: '#13ce66',
              inactiveColor: '#ff4949'
            }
          case 'date':
            return dateProps(item.properties)
          default:
            return {}
        }
      }
      function dateProps(properties) {
        if (properties && properties.type === 'daterange') {
          return {
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            style: { width: '250px' }
          }
        } else {
          return {
            type: 'date',
            placeholder: '请选择日期',
            style: { width: '150px' }
          }
        }
      }
    },

    confirm() {
      const queryData = Object.assign({}, this.queryData)
      const querierConfig = this.querierConfig
      this.$emit('update:querierData', queryDataProcess())
      this.$emit('confirm')

      function queryDataProcess() {
        const resultArr = []
        for (const key in queryData) {
          const value = queryData[key]
          if (checkValue(value)) break
          const config = querierConfig.find(e => e.name === key)
          switch (config.type) {
            case 'input':
              resultArr.push(`${keyProcess(key)} matches '/${value}/'`)
              break
            case 'comparison':
              if (value[0] && value[1]) {
                resultArr.push(`${keyProcess(key)} ${value[1]} ${value[0]}`)
              }
              break
            case 'range':
              if (value[0] && value[1]) {
                resultArr.push(
                  `${keyProcess(key)} >= '${value[0]}`,
                  `${keyProcess(key)} <= '${value[1]}`
                )
              }
              break
            case 'date':
              setDate(key, value, config)
              break
            default:
              resultArr.push(`${keyProcess(key)} == ${value}`)
          }
        }

        return resultArr.join(' && ') || ''

        function checkValue(value) {
          return !(value || value === 0 || value === false)
        }

        function setDate(key, value, config) {
          const type = config.properties.type
          let beginDate = value
          let endDate = value
          if (type && type === 'daterange') {
            beginDate = value[0]
            endDate = value[1]
          }
          resultArr.push(
            `${keyProcess(key)} >= datetime.get('${dateFormat(beginDate)}')`,
            `${keyProcess(key)} <= datetime.get('${dateFormat(
              getTomorrow(endDate)
            )}')`
          )

          function getTomorrow(date) {
            const today = new Date(date)
            return new Date(today.setDate(today.getDate() + 1))
          }
          function dateFormat(date) {
            return `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`
          }
        }

        function keyProcess(key) {
          let result = 'entity'
          const keys = key.split('.')
          keys.forEach(e => {
            result += createKey(e)
          })
          return result

          function createKey(key) {
            if (/^__/.test(key)) {
              return `.${key}()`
            } else {
              return `.get${toUpperCase(key)}()`
            }
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
  }
}
</script>
<style lang='scss' scoped>
.querier-container {
  display: flex;
  align-items: center;
  .query-item + .query-item {
    margin-left: 10px;
  }
}
.comparison {
  .el-select {
    width: 120px;
  }
  ::v-deep .el-input-group__prepend {
    background: #fff;
  }
}
.rangeInput {
  display: flex;
  align-items: center;
  i {
    margin: 0 5px;
  }
}
</style>
