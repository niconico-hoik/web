const webpack = require('webpack')
const { resolve } = require('path')
const { dllVariable, devDir } = require('./variables.js')

module.exports = {
  context: process.cwd(),
  entry: [
    'react',
    'react-dom',
    'atra'
  ],
  output: {
    filename: `${dllVariable}.js`,
    path: devDir,
    library: dllVariable
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(devDir, `${dllVariable}.manifest.json`),
      name: dllVariable
    })
  ]
}
