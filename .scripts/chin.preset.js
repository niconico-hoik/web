require('babel-register')
module.exports = Object.assign({},
  require('chin-plugins-inkscape'),
  require('./chin.plugin')
)
