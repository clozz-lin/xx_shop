Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 获取缓存中的收货地址
        const address = wx.getStorageSync('address')
        // 获取购物车的数据
        const cart = wx.getStorageSync('cart')
        this.setData({
            address
        })
        // 计算全选
        this.setCart(cart || [])
    },

    // 获取收货地址点击事件 
    handleChooseAddress() {
        wx.getSetting({
            success: (res) => {
                const scopeAddress = res.authSetting['scope.address']
                if (scopeAddress === true || scopeAddress === undefined) {
                    wx.chooseAddress({
                        success: (res1) => {
                            console.log(res1)
                            wx.setStorageSync('address', res1)
                        },
                    })
                } else {
                    wx.openSetting({
                        success: (res2) => {
                            wx.chooseAddress({
                                success: (res3) => {
                                    console.log(res3)
                                    wx.setStorageSync('address', res3)
                                },
                            })
                        },
                    })
                }
            },
        })
    },
    // 复选框
    // handleItemChange(e) {
    //     const goods_id = e.currentTarget.dataset.id
    //     let {
    //         cart
    //     } = this.data
    //     let index = cart.findIndex(v => v.goods_id === goods_id)
    //     cart[index].isCheck = !cart[index].isCheck
    //     this.setCart(cart)
    // },
    // 设置购物车状态时，重新计算底部工具栏的数据  
    setCart(cart) {
        let allChecked = true
        // 总价格总数量
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if (v.isCheck) {
                totalPrice = v.num * v.price
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = cart.length != 0 ? allChecked : false
        // 给收货地址赋值
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum

        })

        wx.setStorageSync('cart', cart)

    },
    // 商品全选
    // handleItemAllCheck() {
    //     let {
    //         cart,
    //         allChecked
    //     } = this.data
    //     console.log(allChecked);
    //     console.log(cart);
    //     allChecked = !allChecked
    //     cart.forEach(v => v.isCheck = allChecked)
    //     this.setCart(cart)
    // },
    // - +
    // handleItemNumEdit(e) {
    //     const {
    //         operation,
    //         id
    //     } = e.currentTarget.dataset
    //     let {
    //         cart
    //     } = this.data
    //     const index = cart.findIndex(v => v.goods_id === id)
    //     if (cart[index].num === 1 && operation === -1) {
    //         wx.showModal({
    //             title: '提示',
    //             content: '是否要删除？',
    //             success: (res) => {
    //                 if (res.confirm) {
    //                     cart.splice(index, 1)
    //                     this.setCart(cart)
    //                 } else {
    //                     cart[index] += operation
    //                     this.setCart(cart)
    //                 }
    //             }
    //         })
    //     }
    // },
    // 结算
    // handlePay() {
    //     const {address,totalNum} = this.data
    //     if(address.userName){
    //         wx.showToast({
    //             title: '请选择收货地址',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         return
    //     }
    //     if(totalNum===0) {
    //         wx.showToast({
    //             title: '请选购商品',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         return
    //     }
    //     // wx.navigateTo({
    //     //   url: '/pages/pay/pay',
    //     // })
    //     wx.showToast({
    //         title: '支付还在开发中',
    //         icon: 'success',
    //         duration: 2000
    //       })
    // }
})