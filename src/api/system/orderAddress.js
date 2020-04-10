import request from '@/utils/request'

export function getOrderAddress(params) {
  return request({
    url: 'api/orderAddress',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/orderAddress',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/orderAddress',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/orderAddress',
    method: 'put',
    data
  })
}

export default { add, edit, del, getOrderAddress }
