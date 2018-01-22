const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')
const baseConfig = require('./webpack.config.base.js')

baseConfig.entry = [
  `whatwg-fetch`,
  `babel-polyfill`
].concat(baseConfig.entry)

module.exports = merge(baseConfig, {
  output: {
    path: resolve('.site')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('PRODUCTION')
      }
    })
    // // new webpack.optimize.DedupePlugin(),
    // // new webpack.optimize.AggressiveSplittingPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin()
  ]
})
