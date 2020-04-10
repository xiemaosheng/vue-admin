import request from '@/utils/request'

export function getMediumInfos(params) {
  return request({
    url: 'api/mediumInfo',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/mediumInfo',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/mediumInfo',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/mediumInfo',
    method: 'put',
    data
  })
}

export default { add, edit, del, getMediumInfos }
