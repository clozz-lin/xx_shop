// 网络请求
import {
    getAppInfo
} from '../../api/index/appInfo'

Page({
    data: {
        banner: [], // 轮播图数据源
        goods: [] // 商品数据源,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getBanner()
    },
    // 事件处理函数
    goSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    getBanner() {
        let that = this
        getAppInfo().then(res => {
            this.setData({
                banner: res.data.data.banner,
                goods: res.data.data.categoryList
            })
            // console.log('banner数据源：',that.data.banner);
            // console.log('banner数据id：',that.data.banner.goods_id);
        }).catch(err => {
            console.log('接口调用失败');
            console.log(err);
        })
    }
})