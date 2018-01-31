const webpack = require('webpack')
const merge = require('webpack-merge')
const manifest = require('../_local/dll.manifest.json')
const baseConfig = require('./webpack.config.base.js')
const { devDir } = require('./variables.js')
const port = 7000

module.exports = merge(baseConfig, {
  output: {
    path: devDir,
    publicPath: `http://localhost:${port}/`
  },
  devServer: {
    port,
    contentBase: devDir,
    watchContentBase: true,
    publicPath: '/',
    overlay: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
  },
  devtool: `source-map`,
  plugins: [
    new webpack.DllReferencePlugin({ manifest }),
    new webpack.HotModuleReplacementPlugin()
  ]
})