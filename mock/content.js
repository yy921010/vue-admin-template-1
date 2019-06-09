import Mock from 'mockjs'
const data = Mock.mock({

})

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: data,
        msg: ''
      }
    }
  }
]
