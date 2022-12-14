const pxToRem = require('postcss-pxtorem')
module.exports = {
  //插件
  plugins: [
    pxToRem({
      //根节点字体大小
      //如果是vant 37.5 如果自己的代码 75
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] //所有的属性都转成rem
    })
  ]
}
