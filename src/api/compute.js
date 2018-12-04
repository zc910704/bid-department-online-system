import request from '@/utils/request'

export function autoCompleteCompany(val) {
  return request({
    url: 'compute/company/name',
    method: 'post',
    data: val,
    params: {},
    withCredentials: true
  })
}
