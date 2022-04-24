// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [] // 从本地缓存中同步获取指定 key 的内容
    logs.unshift(Date.now()) // 将新项目添加到数组的开头
    wx.setStorageSync('logs', logs) // 将数据存储在本地缓存中指定的 key 中

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    baseUrl: 'https://www.guxiaoling.com:8466/api',
    userInfo: null
  }
})
