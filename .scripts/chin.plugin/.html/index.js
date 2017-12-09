import { createElement } from 'react'
import Bomb from './Bomb.js'
import Html from './Html.js'

const { CHIN_ENV, CHIN_OUT } = process.env

const requiresMap = {
  DEVELOPMENT: [
    'onerror',
    'dll'
    // 'uappend'
  ],
  PRODUCTION: [
    // 'favicons',
    // 'ganalytics',
    // 'uappend'
  ]
}

const bomb = new Bomb({
  component: Html,
  outpath: require('path').resolve(CHIN_OUT, `index.html`),
  requires: requiresMap[CHIN_ENV]
})

if (CHIN_ENV === 'DEVELOPMENT') {
  bomb.setProp('dll', createElement('script', { src: './dll.js' }))
} else if (CHIN_ENV === 'PRODUCTION') {
  bomb._out()
}

export default bomb
