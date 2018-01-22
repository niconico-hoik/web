const Dotenv = require('dotenv-webpack')
const { resolve } = require('path')

module.exports = {
  context: process.cwd(),
  entry: [resolve(`bundle/index.js`)],
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
      path: resolve(`./.env`),
      systemvars: true
    })
  ]
}
