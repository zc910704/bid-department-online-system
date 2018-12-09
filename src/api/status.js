import request from '@/utils/request'

export function getStatus() {
  return request({
    url: '/server/status',
    method: 'GET',
    withCredentials: true
  })
}

export function getUpdate() {
  return request({
    url: '/server/update',
    method: 'GET',
    withCredentials: true
  })
}
