const http = require('../../utils/request')

function getGoodsInfo(data) {
  return http('/catalog/index',data,'get') //获得分类
}

function getCatalogCurrent(data) {
    return http('/catalog/currentlist',data,'post') // 分类目录当前分类数据接口分类
  }

export {
    getGoodsInfo,
    getCatalogCurrent

}
  
