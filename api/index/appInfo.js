const http = require('../../utils/request')

export function getAppInfo(data) {
  return http('/index/appInfo',data,'get')
}
