const path = require('path');
const rulesConfig = require('./webpack.rules.conf');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob-all");
// 消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// 页面汇集
const htmlArray = require('./webpack.html.conf')

var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    // favicon: './favicon.ico',
    // title: title,
    inject: true,
    // hash: true, //开启hash  ?[hash]
    chunks: chunks,//页面要引入的包
    minify: process.env.NODE_ENV === "development" ? false : {
      removeComments: true, //移除HTML中的注释
      // collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      // removeAttributeQuotes: true, //去除属性引用
    },
  };
};

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: rulesConfig
  },
  plugins: [
    new extractTextPlugin({
      filename: 'css/[name].css',
    }),
    new purifyCssWebpack({
      paths: glob.sync([
        path.join(__dirname, "../src/pages/*.html"),
        path.join(__dirname, "../src/*.js")
      ])
    }),
    
  ]
};

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})