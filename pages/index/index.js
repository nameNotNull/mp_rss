//index.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../data/config.js');
const app = getApp()
var source = 'toutiao';
var pagenum = 1;
var title = '小喵看-头条';


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    feed: [],
    config: []
  },
  // onShareAppMessage: function(res) {
  //   return {
  //     title: '小喵看看',
  //     path: 'pages/index/index'
  //   }
  // },


  //事件处理函数
  bindItemTap: function(event) {
    wx.navigateTo({
      url: '../answer/answer?id=' + event.currentTarget.dataset.id + '&source=' + event.currentTarget.dataset.source
    })
  },
  onLoad: function(options) {
    this.getData(options);
  },
  upper: function() {
    wx.showNavigationBarLoading()
    pagenum = pagenum + 1;
    this.refresh(source, pagenum);
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  lower: function(e) {
    wx.showNavigationBarLoading();
    pagenum = pagenum + 1;
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.refresh(source, pagenum);
    }, 1000);
  },
  getData: function(options) {
    var that = this;
    var url = config.host + '/mapping/search.json';
    util.getData(url).then(
      (res) => {
        var app = getApp();
        var rssConf = wx.getStorageSync('config');
        if (rssConf.length == 0) {
          rssConf = res.data.data;
          wx.setStorageSync('config', rssConf)
        }
        app.globalData.config = rssConf

        var url = '';
        var rssConfig = getApp().globalData.config ? getApp().globalData.config : '';
        for (var i = 0; i < rssConfig.length; i++) {
          if (rssConfig[i].code == options.type) {
            title = rssConfig[i].name;
            source = rssConfig[i].source;
          }
        }
        this.setTabTitle(title);

        url = config.host + '/rss/search.json?source=' + source + '&type=daily';

        util.getData(url).then(
          (res) => {
            let feed = res.data.data;
            this.setData({
              feed: feed,
            })
          }
        );
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
  refresh: function(source, pagenum) {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 500
    });
    var msg = '刷新成功';
    if (source == 'zhihu') {
      url = '';
      msg = '刷完了，休息一下吧'
    } else {
      url = config.host + '/rss/search.json?source=' + source + '&type=daily';
      util.getData(url).then(
        (res) => {
          let content = res.data.data;
          if (content.length > 0) {
            this.setData({
              feed: this.data.feed.concat(content),
            })
          }
        }
      );
    }

    setTimeout(function() {
      wx.showToast({
        title: msg,
        icon: 'success',
        duration: 500
      })
    }, 600)

  },

  getConfig: function() {
    return new Promise(function(resolve, reject) {
      var that = this;
      console.log('getConfig')
      var url = config.host + '/mapping/search.json';
      util.getData(url).then(
        (res) => {
          console.log(res.data.data)
          // let content = res.data.data;
          var app = getApp();
          var rssConf = wx.getStorageSync('config');
          console.log(rssConf);
          if (rssConf.length == 0) {
            rssConf = res.data.data;
            wx.setStorageSync('config', rssConf)
          }
          app.globalData.config = rssConf
          console.log('aa')
          console.log(app.globalData.config)
          resolve(res)
        }
      );
    });

  },
  globalData: {
    config: []
  },
  setTabTitle: function(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }



})