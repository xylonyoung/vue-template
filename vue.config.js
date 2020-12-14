const { title } = require('./src/settings.js')
module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  },
}
