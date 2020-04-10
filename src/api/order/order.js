import request from '@/utils/request'

export function getOrders(params) {
  return request({
    url: 'api/order',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/order',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/order',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/order',
    method: 'put',
    data
  })
}

export function updateIsPause(id) {
    return request({
      url: 'api/order/' + id,
      method: 'put'
    })
  }
  
  export function execution(id) {
    return request({
      url: 'api/order/exec/' + id,
      method: 'put'
    })
  }

  export function makeOrder(data) {
    return request({
      url: 'api/order/makeOrder/',
      method: 'post',
      data
    })
  }

export default { add, edit, del, getOrders, updateIsPause, execution,makeOrder }
