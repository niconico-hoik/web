const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const { resolve } = require('path')
const { entry, devdir, prodir, dotenv, dllname } = require('./.variables.js')

let manifest
try { manifest = require('./_local/dll.manifest.json') }
catch(e) { console.error('manifest is not exist') }

const context = process.cwd()
const port = 7000

const BASE = {
  context,
  entry: resolve(entry),
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: `babel-loader?cacheDirectory`, exclude: [resolve('node_modules')] },
      { test: /\.css$/, loader: 'css-loader' }
    ]
  },
  plugins: [
    new Dotenv({
      path: dotenv,
      systemvars: true
    })
  ]
}

const configs = {

  'dll': () => ({
    mode: 'none',
    context,
    entry: [
      'react',
      'react-dom',
      'atra'
    ],
    output: {
      filename: `${dllname}.js`,
      path: resolve(devdir),
      library: dllname
    },
    plugins: [
      new webpack.DllPlugin({
        path: resolve(devdir, `${dllname}.manifest.json`),
        name: dllname
      })
    ]
  }),

  'dev': () => merge(BASE, {
    mode: 'development',
    output: {
      path: resolve(devdir),
      publicPath: `http://localhost:${port}/`
    },
    devServer: {
      port,
      contentBase: resolve(devdir),
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
  }),

  'pro': () => merge(BASE, {
    mode: 'production',
    entry: [
      `whatwg-fetch`,
      `babel-polyfill`
    ].concat(
      [resolve(entry)]
    ),
    output: {
      path: resolve(prodir)
    },
    resolve: {
      mainFields: ['jsnext:main', 'module', 'browser', 'main']
    },
    optimization: {
      providedExports: true,
      usedExports: true,
      sideEffects: true,
      // concatenateModules: false // <= important for tree-shaking???
    }
  }),

  non() {
    const pro = this.pro()
    pro.mode = 'none'
    pro.plugins = pro.plugins || []
    pro.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }))
    return pro
  },

  ana() {
    const pro = this.pro()
    pro.plugins = pro.plugins || []
    pro.plugins.push(new BundleAnalyzerPlugin({}))
    return pro
  },

  spl() {
    const pro = this.pro()
    pro.optimization = Object.assign({}, pro.optimization, {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      }
    })
    return pro
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
module.exports = configs[suffix]()