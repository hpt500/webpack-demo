const path = require('path');
const merge = require("webpack-merge");
const base = require('./webpack.base.conf')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
// 压缩css
const optimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const config = merge(base,{
    mode: 'production',
    plugins: [
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        new uglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: false,
                    drop_console: true
                }
            }
        }),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/assets"),
            to: './assets',
            ignore: ['.*']
        }]),
        new optimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true
            }
        }),
    ]
})

module.exports = config 