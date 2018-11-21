import request from '@/utils/request'

export function getcallist() {
  return request({
    url: '/data/calllistinfo',
    method: 'get'
  })
}
