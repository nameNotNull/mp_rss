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
    var url = 'http://rss.dev.com/rss/detail.json?source=zhihu&type=daily&id='+options.id;
    console.log(url);
    return util.getData(url).then(
      (res) => {
        console.log(res.data.data)

        var html = res.data.data.content;
        WxParse.wxParse('article', 'html', html, this, 5);
        // let feed = res.data.items;
        // for (let i = 0; i < feed.length; i++) {
        //   WxParse.wxParse('content' + i, 'html', util.tw2sw_string(feed[i].summary), this);

        // }

        // this.setData({
        //   feed: feed,
        // })

      }
    );
  },
  tapName: function(event){
  }
})
