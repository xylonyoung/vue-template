<template>
  <div class="agreement-wrapper">
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return { content: '' }
  },
  created() {
    const { language } = this.$route.query
    this.$api.agreement.get().then(res => {
      const { data } = res
      if (language) {
        this.content = data[language]
      } else {
        this.content = data.zh
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.agreement-wrapper {
  max-width: 740px;
  margin: 0 auto;
}
</style>