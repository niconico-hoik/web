const { resolve } = require('path')
module.exports = {
  dllVariable: 'dll',
  entry: resolve(`bundled`),
  dotenv: resolve(`.env`),
  devDir: resolve('_local'),
  proDir: resolve('_site')
}
