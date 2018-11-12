module.exports = {

}

var host = 'https://www.xiaomiao.mobi';
// var host = 'http://rss.dev.com';

var config= {
  routers: [
    {
      name: '小喵看-知乎',
      icon: '/images/zhihu.jpg',
      code: '1',
      source: 'zhihu',
      checked: true
    },
    {
      name: '小喵看-新浪',
      icon: '/images/weibo.png',
      code: '2',
      source: 'sina',
      checked: true
    },
    {
      name: '小喵看-头条',
      icon: '/images/toutiao.png',
      code: '3',
      source: 'toutiao',
      checked: true
    },
    {
      name: '小喵看-网易',
      code: '4',
      icon: '/images/wangyi.jpeg',
      source: 'wangyi',
      checked: true
    },
    {
      name: '微信',
      icon: '/images/weixin.jpeg',
      code: '5',
      checked: true
    },
    {
      name: '新闻',
      icon: '/images/weibo.png',
      code: '6',
      checked: true
    },
    {
      name: '新浪',
      icon: '/images/weibo.png',
      code: '7',
      checked: true
    },
    {
      name: '豆瓣',
      icon: '/images/weibo.png',
      code: '8',
      checked: true
    },
    {
      name: '网易',
      icon: '/images/weibo.png',
      code: '9',
      checked: true
    }
  ]

}

module.exports.config = config.routers;
module.exports.host = host;