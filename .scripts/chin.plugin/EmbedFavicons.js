import faviconsNotPromise from 'favicons'
const favicons = require('util').promisify(faviconsNotPromise)
import { outputFile } from 'fs-extra'
import { htmlToReactElement } from './util.js'
import htmlBomb from './.html'

export default opts => data =>
  favicons(data, faviconsConfig)
    .then(res => {
      const tags = res.html.join('')
      htmlBomb.setProp('favicons', htmlToReactElement(tags).props.children)
      return [].concat(res.images, res.files)
    })
    .then((files) =>
      Promise.all(files.map(
        ({ name, contents }) => outputFile(`${opts.dir}/${name}`, contents)
      ))
    )
    .then(() => undefined)

const faviconsConfig = {
  appName: '',
  path: 'favicons',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
}
