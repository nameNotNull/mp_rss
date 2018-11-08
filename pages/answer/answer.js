//answer.js
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var config = require('../../data/config.js');

var app = getApp()
Page({
  data: {
    motto: '小喵看看',
    userInfo: {}
  },
  
  onLoad: function (options) {
    var that = this
    console.log(options)
    var url = config.host+'/rss/detail.json?source='+options.source+'&type=daily&id='+options.id;
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
