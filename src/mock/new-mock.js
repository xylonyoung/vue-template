const Mock = require('mockjs')

const success = {
  code: 0,
  status: 200,
  message: 'success',
}

export default function newMock(data, response) {
  if (response) {
    return Mock.mock(Object.assign(response, data))
  } else {
    return Mock.mock(Object.assign(success, data))
  }
}
