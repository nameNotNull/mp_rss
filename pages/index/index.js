//index.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()



Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    feed: {}
  },

  //事件处理函数
  bindItemTap: function (event) {
    wx.navigateTo({
      url: '../answer/answer?id='+event.currentTarget.dataset.id
    })
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 1000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.refresh(); }, 1000);
    console.log("lower")
  },
  getData: function() {
    // var url = 'http://rss.dev.com/rss/search.json?source=zhihu&type=hotlist';
    var url = 'http://rss.dev.com/rss/search.json?source=zhihu&type=daily';
    return util.getData(url).then(
      (res) => {
        let feed = res.data.data;
        for (let i = 0; i < feed.length; i++) {
          WxParse.wxParse('content' + i, 'html', util.tw2sw_string(feed[i].content), this);
          if ( i=== feed.length - 1) {
            WxParse.wxParseTemArray("contentarry", 'content', feed.length, this)
          }
          feed[i].summary = util.tw2sw_string(feed[i].content)
          var contentIndex = 'content' + i;
          feed[i].contentindex = this.data[contentIndex]
          
        }

        this.setData({
          feed: feed,
        })
        
      }
    );
  },
  onGotUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var url = 'http://rss.dev.com/rss/search.json?source=zhihu&type=daily';
    util.getData(url).then(
      (res) => {
        console.log(res)
        let feed = res.data.data;
        for (let i = 0; i < feed.length; i++) {
          WxParse.wxParse('content' + i, 'html', util.tw2sw_string(feed[i].content), this);
          if (i === feed.length - 1) {
            WxParse.wxParseTemArray("contentarry", 'content', feed.length, this)
          }
          feed[i].summary = util.tw2sw_string(feed[i].content)
          var contentIndex = 'content' + i;
          feed[i].contentindex = this.data[contentIndex]

        }

        this.setData({
          feed: feed,
        })

      }
    );
    
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },


  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getData();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  }
})