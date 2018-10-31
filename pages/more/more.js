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
    console.log('aa')
    wx.reLaunch({
      url: '../index/index?type=' + event.currentTarget.dataset.id
    })
  },
  onLoad: function () {
    var that = this
    console.log(config.config)
    that.setData({
      routers:config.config
    })
  }
})
