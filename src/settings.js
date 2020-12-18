module.exports = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://mockjs' : '',
  //website title
  title: 'Vue Template',
  // less then mobilePx, class named 'main-container' will change 100% width.
  // otherwise is resizePx
  mobilePx: '999',
  resizePx: '1226',
  hideHeaderPaths: ['/login'],
  needLoginPaths: ['/user'],
}
