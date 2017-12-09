import { DefinePlugin } from 'webpack'
import merge from 'webpack-merge'
import { resolve } from 'path'
import baseConfig from './webpack.config.base.babel.js'

baseConfig.entry.unshift(`whatwg-fetch`, `babel-polyfill`)

export default merge(baseConfig, {
  output: {
    path: resolve('.site')
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('PRODUCTION')
      }
    })
  ]
})
