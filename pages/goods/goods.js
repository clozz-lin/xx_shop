import {
    getGoodsInfo
} from '../../api/goods/goodsInfo'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo: {},
        swiperItem: [],
        contents: '',
        SwiperItem: {},
        cart: [{
            num: 0,
            goods_id: 0
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        const {
            goods_id
        } = option;


        // console.log(goods_id);
        getGoodsInfo({
            id: goods_id
        }).then(res => {
            // console.log(res);
            const swiperItem = res.data.data.gallery
            this.SwiperItem = swiperItem;
            this.goodsInfo = res.data.data;
            this.setData({
                goodsInfo: res.data.data,
                swiperItem: swiperItem,
                contents: res.data.data.info.goods_desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')

            })
            // 
        }).catch(err => {
            console.log('goods接口调用失败');
            console.log(err);
        })

    },
    // 
    handlePreviewImage(e) {
        const urls = this.SwiperItem.map(v => v.img_url)
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current, // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
        })
    },
    // 点击加入购物车
    handleCartAdd() {
        // 1.获取缓存中的购物车 数组
        let cart = wx.getStorageSync('cart') || []
        // let cart = []
        // 2.判断 商品对象是否存在于购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.goodsInfo.productList[0].goods_id)
        // console.log(index);
        // console.log(this);

        if (index === -1) {
            // 3.不存在 第一次添加
            // console.log(this);
            const goods_id = this.goodsInfo.productList[0].goods_id;
            console.log(this.goodsInfo);
            const title = this.goodsInfo.info.name;
            const image = this.goodsInfo.info.https_pic_url;
            const price = this.goodsInfo.info.retail_price;
            let goodNum = {
                goods_id : goods_id,
                num : 0,
                title: title,
                image: image,
                price: price,
                isCheck: true
            };
            goodNum.num = 1;
            
            // this.goodsInfo.productList.has_change = 1;
            // cart.push(this.goodsInfo.productList.has_change)
            cart.push(goodNum)
            // cart.push(goods_id)
        } else {
            // 4.已经存在购物车的数据 执行num++
            cart[index].num++
        }
        // console.log(cart);
        // 5.把购物车重新添加回缓存中
        wx.setStorageSync('cart', cart)
        // 6.弹窗提示
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1500,
            mask: true
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