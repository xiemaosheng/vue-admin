import request from '@/utils/request'

export function getShopCards(params) {
  return request({
    url: 'api/shopCard/allocation',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/shopCard/allocation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/shopCard/allocation',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/shopCard/allocation',
    method: 'put',
    data
  })
}

export default { add, edit, del, getShopCards }
