module.exports = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://mockjs' : '',
  //website title
  title: 'Vue Template',
  mobilePx: '999',
  desktopPx: '1226',
  unResizePaths: ['/login', '/user'],
  hideHeaderPaths: ['/login'],
  needLoginPaths: ['/user'],
}
