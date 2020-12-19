import { desktopPx, mobilePx, unResizePaths } from '@/settings'
export default {
  data() {
    return {
      resizeEvt: 'orientationchange' in window ? 'orientationchange' : 'resize',
    }
  },
  beforeMount() {
    window.addEventListener(this.resizeEvt, this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener(this.resizeEvt, this.resizeHandler)
  },
  watch: {
    $route: {
      handler() {
        this.resizeHandler()
      },
      deep: true,
    },
  },
  mounted() {
    this.resizeHandler()
  },
  methods: {
    resizeHandler() {
      let clientWidth = document.documentElement.clientWidth
      const isMobile = clientWidth < mobilePx
      this.$store.commit('app/MOBILE_DEVICE', isMobile)
      this.$store.commit(
        'app/SET_MAIN_WIDTH',
        isMobile || unResizePaths.includes(this.$route.path) ? '100%' : `${desktopPx}px`
      )

      let baseWidth = 720,
        grids = baseWidth / 100
      clientWidth = clientWidth || 320
      if (clientWidth > 720) {
        clientWidth = 720
      }
      document.documentElement.style.fontSize = clientWidth / grids + 'px'
    },
  },
}
