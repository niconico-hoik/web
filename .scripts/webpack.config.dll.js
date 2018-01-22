const webpack = require('webpack')
const { resolve } = require('path')

const VAR_NAME = 'dll'
const path = resolve('.local')

module.exports = {
  context: process.cwd(),
  entry: [
    'react',
    'react-dom',
    'atra'
  ],
  output: {
    filename: `${VAR_NAME}.js`,
    path,
    library: VAR_NAME
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(path, `${VAR_NAME}.manifest.json`),
      name: VAR_NAME
    })
  ]
}
