//logs.js
var util = require('../../utils/util.js')
var config = require('../../data/config.js');

const app = getApp()
Page({
  data: {
    routers: [
    ]
    
  },
  //事件处理函数
  bindItemTap: function (event) {
    wx.reLaunch({
      url: '../index/index?type=' + event.currentTarget.dataset.id
    })
  },
  onLoad: function () {
    var that = this
    var app = getApp();
    var rssConf = wx.getStorageSync('config');
   
    // app.globalData.config = rssConf
    that.setData({
      routers: rssConf
    })
  }
})
