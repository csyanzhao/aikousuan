//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    result: '',
    formvalue: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  generateExpression: function(){
    this.setData({ formvalue: '', suc: ''})
    var r1 = Math.round(Math.random() * 10)
    var r2 = Math.round(Math.random() * 10)
    var r3 = Math.round(Math.random() * 10)
    var r4 = r1+r2+r3
    this.setData({
      motto: r1.toString() + " + " + r2.toString() + " + " + r3.toString() + "= ？",
      result: r4.toString()
    }) 
  },
  formSubmit: function(e){  
    if (e.detail.value.test=="")
    {
      wx.showToast({
        title: '结果不能为空！', // 标题
        icon: 'none',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    }else
    {
      if (this.data.result == e.detail.value.test) {
        wx.showToast({
          title: '真棒！答对了！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      } else {
        wx.showToast({
          title: '答错啦！正确答案是：' + this.data.result+'继续努力哦！', // 标题
          icon: 'none',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    }
    
  }
})
