import { createElement } from 'react'
import Bomb from './Bomb.js'
import { DEVELOPMENT, PRODUCTION } from './Html.js'

const bombMap = {
  DEVELOPMENT: {
    component: DEVELOPMENT,
    requires: [
      'onerror',
      'dll'
    ]
  },
  PRODUCTION: {
    component: PRODUCTION,
    requires: [
      'favicons',
      'ganalytics'
    ]
  }
}

const { CHIN_ENV, CHIN_OUT } = process.env
const { component, requires } = bombMap[CHIN_ENV]
const outpath = require('path').resolve(CHIN_OUT, `index.html`)
const bomb = new Bomb({ component, requires, outpath })

if (CHIN_ENV === 'DEVELOPMENT') {
  bomb.setProp('dll', createElement('script', { src: './dll.js' }))
}

export default bomb