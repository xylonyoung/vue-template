module.exports = {
  baseURL: process.env.NODE_ENV === 'development' ? 'https://mockjs' : '',
  title: 'Vue Template',
  hideHeaderPaths: ['/login'],
  needLoginPaths: [],
}
