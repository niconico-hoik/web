import { resolve } from 'path'
import { DllPlugin } from 'webpack'

const VAR_NAME = 'dll'
const path = resolve('.local')

export default {
  context: process.cwd(),
  entry: [
    'react',
    'react-dom',
    'whatwg-fetch',
    'babel-polyfill',
    'orph',
    'atra',
    // 'lonogara',
    // 'lonogara-tool'
  ],
  output: {
    filename: `${VAR_NAME}.js`,
    path,
    library: VAR_NAME
  },
  plugins: [
    new DllPlugin({
      path: resolve(path, `${VAR_NAME}.manifest.json`),
      name: VAR_NAME
    })
  ]
}
