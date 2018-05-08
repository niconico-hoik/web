import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import merge from 'webpack-merge'
import { resolve } from 'path'
import { entry, devdir, prodir, dotenv, dllname } from './.variables.js'

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

  'dll': {
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
  },

  'dev': merge(BASE, {
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

  'pro': merge(BASE, {
    entry: [`whatwg-fetch`, `babel-polyfill`].concat([resolve(entry)]),
    output: {
      path: resolve(prodir)
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      })
    ]
  })

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]