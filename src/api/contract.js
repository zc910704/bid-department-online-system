import request from '@/utils/request'

export function searchContractPrice(val) {
  return request({
    url: 'contract/price/detail',
    method: 'post',
    data: val,
    params: {}
  })
}
