import { success } from '../base-data'
import { param2Obj } from '../utils'

const Mock = require('mockjs')

function createList(response) {
  let params = { page: 1, next: 2, endPage: 3 }
  if (response) {
    const { url } = response
    params = Object.assign(params, param2Obj(url))
    params.next = +params.page + 1
  }
  return Mock.mock(
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
      paginator: {
        current: params.page,
        next: params.next,
        endPage: params.endPage,
        totalCount: 30,
      },
    })
  )
}
export default {
  'load-list.get': response => createList(response),
  'uni-pagination.get': response => createList(response),
}
