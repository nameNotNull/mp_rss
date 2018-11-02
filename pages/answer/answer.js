//answer.js
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {}
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (options) {
    var that = this
    var url = 'https://www.xiaomiao.mobi/rss/detail.json?source='+options.source+'&type=daily&id='+options.id;
    return util.getData(url).then(
      (res) => {
        var html = res.data.data.content;
        WxParse.wxParse('article', 'html', html, this, 5);
      }
    );
  },
  tapName: function(event){
  }
})
