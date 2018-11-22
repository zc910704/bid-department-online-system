import request from '@/utils/request'

export function getcallist() {
  return request({
    url: '/data/calllistinfo',
    method: 'get'
  })
}
export function searchCallList(val) {
  return request({
    url: '/data/search-call-list',
    method: 'post',
    data: val
  })
}
