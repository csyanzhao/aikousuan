// pages/Compute/StartCompute.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '',
    result: '',
    formvalue: '',
    TotalQ: 10,//总题目数
    timer: '',//定时器名字
    countDownNum: 10,//倒计时初始值
    QCount: 0,
    Points: 0,
    UsedTime: 0,
    SubmitCount: 0,
    answeredQ: [],
    btn_submit: false,
    visible: false
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.generateExpression()
    this.setData({visible: false})
  },

  generateExpression: function(){
    let that = this
    this.setData({countDownNum: '10', formvalue: '', suc: ''})
    var obj ={}
    var r1 = Math.round(Math.random() * 10)
    var r2 = Math.round(Math.random() * 10)
    var r3 = Math.round(Math.random() * 10)
    var r4 = r1+r2+r3
    var resmotto = r1.toString() + " + " + r2.toString() + " + " + r3.toString() + "= "
    obj.seq = that.data.QCount+1
    obj.question = resmotto
    obj.answer = r4
    obj.useranswer = ''
    obj.result = '未提交！'
    var answ = that.data.answeredQ
    answ.push(obj)
    this.setData({
      motto: resmotto,
      result: r4.toString(),
      QCount: that.data.QCount+1,
      answeredQ: answ
    })
    this.countDown(); 
  },
  formSubmit: function(e){  
    var result = ''
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
        result = '正确！'
        var points = this.data.Points+10
        this.setData({Points: points})
      } else {
        wx.showToast({
          title: '答错啦！正确答案是：' + this.data.result+'继续努力哦！', // 标题
          icon: 'none',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
        result = '错误！'
      }
      
        var answ = this.data.answeredQ
        answ[this.data.QCount-1].useranswer = e.detail.value.test
        answ[this.data.QCount-1].result = result
        this.setData({answeredQ: answ})
        this.setData({UsedTime: this.data.UsedTime+10-this.data.countDownNum,SubmitCount: this.data.SubmitCount+1})
        clearInterval(this.data.timer);//关闭定时器
      if(this.data.QCount<this.data.TotalQ)
          this.generateExpression();//答完之后下一题自动开始
      else{
          if(answ[this.data.TotalQ-1].result != "未提交")//最后一题提交后按钮不可用
          this.setData({btn_submit: true})
          this.setData({visible: true})
      }
    }
    
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    if(that.data.QCount<that.data.TotalQ)
    {
      that.setData({
        timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
          //每隔一秒countDownNum就减一，实现同步
          countDownNum--;
          //然后把countDownNum存进data，好让用户知道时间在倒计着
          that.setData({
            countDownNum: countDownNum
          })
          //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
          if (countDownNum == 0) {
            //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
            //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
            clearInterval(that.data.timer);
            //关闭定时器之后，可作其他处理codes go here
            that.generateExpression();
          }
        }, 1000)
      })
    }else{
      that.setData({timer: 0})
    }      
    
  },
  RestartCompute: function(){
    wx.redirectTo({
      url: '../index/index'
    })
  }
})