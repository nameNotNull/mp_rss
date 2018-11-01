//index.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../data/config.js');
const app = getApp()
var rssType = 1;
var page = 1;


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    feed: [],
    config: []
  },

  //事件处理函数
  bindItemTap: function (event) {
    wx.navigateTo({
      url: '../answer/answer?id='+event.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    this.getConfig();
    console.log(config)
    console.log(options)
    console.log('----------')
    
    var url ='';
    if(options.type == 1 || options.type == null){
      // url = 'https://www.xiaomiao.mobi/rss/search.json?source=zhihu&type=daily';
      url = 'http://rss.dev.com/rss/search.json?source=zhihu&type=daily';
      rssType = 1;
    }else{
      // url = 'https://www.xiaomiao.mobi/rss/search.json?source=zhihu&type=daily';
      url = 'http://rss.dev.com/rss/search.json?source=sina&type=daily';
      rssType = 2;      
    }

    //调用应用实例的方法获取全局数据
    console.log(url)
    this.getData(url);
  },
  upper: function () {
    wx.showNavigationBarLoading()
    page = page+1;
    this.refresh(rssType,page);
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 1000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    page = page+1;
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.refresh(rssType,page); }, 1000);
    console.log("lower")
  },
  getData: function(url) {
    return util.getData(url).then(
      (res) => {
        let feed = res.data.data;
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
  refresh: function (source,pagenum) {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var url = '';
    if (source == 1) {
      // url = 'https://www.xiaomiao.mobi/rss/search.json?source=zhihu&type=daily';
      url = 'http://rss.dev.com/rss/search.json?source=zhihu&type=daily';
    } else {
      // url = 'https://www.xiaomiao.mobi/rss/search.json?source=zhihu&type=daily';
      url = 'http://rss.dev.com/rss/search.json?source=sina&type=daily&page='+pagenum+'&size=10';
    }
    util.getData(url).then(
      (res) => {
        let content = res.data.data;
        

        this.setData({
          feed: this.data.feed.concat(content),
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
  },
  getConfig:function(){
    var that = this
    var app = getApp();
    var rssConf = wx.getStorageSync('config');
    if(rssConf==null){
      rssConf = config.config;
    }
    app.globalData.config = rssConf
  },
  globalData:{
    config:[]
  }



})