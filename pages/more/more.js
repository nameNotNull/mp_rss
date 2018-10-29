//logs.js
var util = require('../../utils/util.js')

const app = getApp()
Page({
  data: {
    routers: [
      {
        name: '知乎',
        icon: '/images/zhihu.jpg',
        code: '1',
        checked: true
      },
      {
        name: '老司机',
        icon: '/images/laosiji.jpeg',
        code: '2',
        checked: true
      },
      {
        name: 'CSS',
        icon: '/images/index.png',
        code: '3',
        checked: true
      },
      {
        name: '微博',
        code: '4',
        checked: true
      },
      {
        name: '微信',
        icon: '/images/index.png',
        code: '5',
        checked: true
      },
      {
        name: '新闻',
        icon: '/images/index.png',
        code: '6',
        checked: true
      },
      {
        name: '新浪',
        icon: '/images/index.png',
        code: '7',
        checked: true
      },
      {
        name: '豆瓣',
        icon: '/images/index.png',
        code: '8',
        checked: true
      },
      {
        name: '网易',
        icon: '/images/index.png',
        code: '9',
        checked: true
      }
    ]
    
  },
  //事件处理函数
  bindItemTap: function (event) {
    var data = this.data.routers;
    console.log(this.data)
    data.forEach(function (value, i) {
      var rssCode = event.currentTarget.dataset.id;
      if(value.code == rssCode){
        value.checked = !value.checked;
      }
    });
    this.setData({
      routers: data,
    });
    console.log(this.data)
    
  },
  onLoad: function () {
    var that = this
  }
})
