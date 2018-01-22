const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')
const manifest = require('../.local/dll.manifest.json')
const baseConfig = require('./webpack.config.base.js')

const PORT = 7000
const localPath = resolve('.local')

module.exports = merge(baseConfig, {
  output: {
    path: localPath,
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    contentBase: localPath,
    watchContentBase: true,
    publicPath: '/',
    overlay: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    // proxy: {
    //   '/tumblr/**': {
    //     target: 'https://api.tumblr.com',
    //     secure: false,
    //     changeOrigin: true,
    //     bypass: (req, res, options) => {}
    //   }
    // }
  },
  devtool: `source-map`,
  plugins: [
    new webpack.DllReferencePlugin({ manifest }),
    new webpack.HotModuleReplacementPlugin()
    // https://webpack.js.org/plugins/hot-module-replacement-plugin/
  ]
})
