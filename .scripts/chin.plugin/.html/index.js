import Bomb from './Bomb.js'
import { DEVELOPMENT, PRODUCTION_LIGHT, PRODUCTION_MASTER } from './Html.js'

const bombMap = {
  "DEVELOPMENT": {
    component: DEVELOPMENT,
    requires: [
      'onerror'
    ]
  },
  "PRODUCTION:LIGHT": {
    component: PRODUCTION_LIGHT,
    requires: [
      'onerror'
    ]
  },
  "PRODUCTION:MASTER": {
    component: PRODUCTION_MASTER,
    requires: [
      'favicons',
      'ganalytics'
    ]
  }
}

const { CHIN_ENV, CHIN_OUT } = process.env
const { component, requires } = bombMap[CHIN_ENV]

export default new Bomb({
  component,
  requires,
  outpath: require('path').resolve(CHIN_OUT, `index.html`)
})