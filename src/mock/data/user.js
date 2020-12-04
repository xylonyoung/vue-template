import { success } from '../base-data'

const Mock = require('mockjs')

const user = Mock.mock(
  Object.assign(success, {
    'data|10': [
      {
        createdTime: '@datetime',
        name: '@cname',
        region: '@region',
        avatar: '@image',
        'images|3': ['@image'],
      },
    ],
  })
)
const login = Mock.mock(
  Object.assign(success, {
    data: 'token'
  })
)

export default {
  'user.get': () => user,
  'user.login': () => login,
}
