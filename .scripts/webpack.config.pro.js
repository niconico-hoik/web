const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const { proDir } = require('./variables.js')

baseConfig.entry = [
  `whatwg-fetch`,
  `babel-polyfill`
].concat(baseConfig.entry)

module.exports = merge(baseConfig, {
  output: {
    path: proDir
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('PRODUCTION')
      }
    })
  ]
})
