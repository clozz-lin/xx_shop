const app = getApp()
const baseUrl = app.globalData.baseUrl

const requestSync = (_url, _data, _method, _callcomplete) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+_url,
      data: _data || {},
      method: _method,
      success: (res) => {
        if (res.statusCode === 200) {
        //   console.log("wx.request is success:200 0k.")
          resolve(res)
        } else {
        //   console.log("wx.request is success:200 lost.")
          reject(res)
        }
      },
      fail: (res) => {
        // console.log("wx.request is fail:" + res.errMsg)
        reject(res)
      },
      complete: (res) => {
        // console.log('wx.request is complete.')
        if (_callcomplete && typeof _callcomplete === 'function') {
          _callcomplete(res)
        }
      }
    })
  });
}

module.exports = requestSync
