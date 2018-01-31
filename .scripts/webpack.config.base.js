const Dotenv = require('dotenv-webpack')
const { resolve } = require('path')
const { entry, dotenv } = require('./variables.js')

module.exports = {
  context: process.cwd(),
  entry: [entry],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [resolve('node_modules')],
        use: [`babel-loader?cacheDirectory`]
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: dotenv,
      systemvars: true
    })
  ]
}
