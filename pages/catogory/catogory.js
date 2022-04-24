// pages/catogory/catogory.js
import {
    getGoodsInfo,
    getCatalogCurrent
} from '../../api/catogory/catogory'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [], //  左侧的菜单数据
        rightContent: [], //  右侧的商品数据
        currentIndex: 0, //  被点击的左侧菜单
        scrollTop: 0 //   滚动条初始化

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取左侧菜单栏数据
        getGoodsInfo().then(res => {
            // console.log(res);
            // let nowId = 
            this.setData({
                leftMenuList: res.data.data.categoryList,
                // nowId:res.data.data.categoryList.id
            })
        }).catch(err => {
            console.log(err);
        })
        // 获取居家右侧商品数据
        getCatalogCurrent({id:1005000}).then(res => {
            // console.log(res)
            this.setData({
                rightContent: res.data.data.data
            })
        }).catch(err => {
            console.log(err)
        })
    },
    // 左侧菜单点击事件源
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        this.setData({
            currentIndex: index,
            scrollTop: 0
        })
        // 获取居家右侧商品数据
        const {
            id
        } = e.currentTarget.dataset;
        getCatalogCurrent({id}).then(res => {
            console.log(res)
            this.setData({
                rightContent: res.data.data.data
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})