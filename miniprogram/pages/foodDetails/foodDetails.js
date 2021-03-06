import {
  getFoodDetail
} from '../../network/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodData: null,
    scene: '',
    platform: '',
    shareMoments: true,
    walkTime: 0,
    runTime: 0,
    suggest: [],
    page: 1,
    slotshow: false,
    // fromlist:true,
    off: true,
    animationData: {},
    imageAnimationData: {},
    animation: '',
    imageAnimation: '',
    suggestG: '',
    recordShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation

    var imageAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.imageAnimation = imageAnimation



    var scene = wx.getLaunchOptionsSync().scene
    this.setData({
      scene: scene,
      platform: wx.getSystemInfoSync().platform,
      shareMoments: wx.getStorageSync('shareMoments') == 'false' ? false : true
    })
    var id = options.id
    this.getData(id)
  },


  openSlot: function () {
    // 使用动画
    if (this.data.off) {
      // 盒子高度拉长
      this.animation.height(200).step()
      this.setData({
        animationData: this.animation.export()
      })
      // 点击图 旋转一周
      this.imageAnimation.rotate(180).step()
      this.setData({
        imageAnimationData: this.imageAnimation.export()
      })
    } else {
      // 盒子高度恢复
      this.animation.height(54).step()
      this.setData({
        animationData: this.animation.export()
      })
      // 点击图 旋恢复
      this.imageAnimation.rotate(-180).step()
      this.setData({
        imageAnimationData: this.imageAnimation.export()
      })
    }
    this.data.off = !this.data.off
  },
  closeSlot: function () {

    this.setData({
      slotshow: false,
    })
  },



  // 点击了分享朋友圈不再提示
  offShareMoments() {
    this.setData({
      shareMoments: false
    })
    wx.setStorageSync('shareMoments', 'false')
  },

  onShare() {
    wx.showToast({
      title: `点击右上角‘•••’即可分享`,
      icon: 'none'
    })
  },


  async getData(id) {
    var res = await getFoodDetail({
      id: id,
      m: 'getIngredientDetails'
    })
    console.log(res)
    if (res.status == 1) {
      this.calculateTime(res.data.calory)
      this.setData({
        foodData: res.data
      })
    }
  },

  calculateTime(nums) {
    console.log(nums)
    var walkTime = 0,
      runTime = 0;
    walkTime = nums / (300 / 60)
    runTime = nums / (600 / 60)
    this.setData({
      walkTime,
      runTime
    })
  },
  goTop() {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  onMore() {
    wx.showToast({
      title: '更多功能 正在开发中~',
      icon: 'none'
    })
  },

  toSuggest() {
    wx.navigateTo({
      url: '/pages/suggest/suggest'
    })
  },

  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  backHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // convertKey (arr, key) {
  //   let newArr = [];
  //   arr.forEach((item, index) => {
  //       let newObj = {};
  //       for (var i = 0; i < key.length; i++) {
  //           newObj[key[i]] = item[Object.keys(item)[i]]
  //       }
  //       newArr.push(newObj);
  //   })
  //   return newArr;
  // },
  binddragging(e) {
    console.log(e.detail.scrollLeft)
  },
  record() {
    wx.showToast({
      title: '功能即将上线',
      icon: 'none'
    })

    return

    this.setData({
      recordShow: true
    })
  },
  onClose() {
    this.setData({
      recordShow: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      // withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareTimeline: function () {
    return {
      title: '食物卡路里小程序:' + this.data.foodData.name + '每' + this.data.foodData.weight + '克含有' + this.data.foodData.calory + '卡路里',
      query: {
        id: this.data.foodData.id
      },
    }
  },


  /**
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})