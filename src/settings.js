module.exports = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://mockjs' : '',
  //website title
  title: 'Vue Template',
  //less then mobilePx is mobile device
  mobilePx: '1130',
  //label main's width
  mainWidth: '1226',
  //mainWidth unused
  unResizePaths: ['/login', '/user'],
  hideHeaderPaths: ['/login'],
  needLoginPaths: ['/user'],
}
