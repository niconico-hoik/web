import { resolve } from 'path'

const nodeModulesPath = resolve('node_modules')

export default {
  context: process.cwd(),
  entry: [resolve(`app/index.js`)],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath],
        use: [`babel-loader?cacheDirectory`]
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}
