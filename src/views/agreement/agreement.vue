<template>
  <div class="agreement-wrapper">
    <div v-html="content"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['language']),
  },
  data() {
    return { content: '' }
  },
  created() {
    const { lang } = this.$route.query
    this.$api.agreement.get().then(res => {
      const { data } = res
      if (lang) {
        this.content = data[lang]
      } else {
        this.content = data[this.language] || data.zh
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