const http = require('../../utils/request')

export function getGoodsInfo(data) {
  return http('/goods/detail',data,'get') //获得商品的详情
}
