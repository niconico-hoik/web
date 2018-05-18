import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import presetM2H from 'lonogara-sdk/unified/m2h'
import { outputFile } from 'fs-extra'
import { join } from 'path'
import indexHtml, { TITLE } from './chin.indexHtml.js'
import { devdir, prodir } from './.variables.js'

/* extensions */

const ink2pdf = inkscape('pdf')
const ink2png = inkscape('png', { width: 1024, background: '#ffffff' })

const m2h = unified('.html', presetM2H())

const img = imagemin({
  gifsicle: {},
  jpegtran: {},
  optipng: {},
  svgo: {}
})

const png2favs = favicons({
  nameAsDir: true,
  config: {
    path: 'favicons',
    appName: TITLE
  }
})

/* configs */

const assets = 'frame'

const ignoredExMaster = [
  'favicons.png',
  '**.txt',
  '**.xml'
]

const commonProcessors = {
  md: m2h,
  png: img,
  jpg: img,
  svg: img
}

const configs = {

  'pre': {
    put: 'preframe',
    out: assets,
    processors: [
      ['pdf', { svg: ink2pdf }],
      ['*', { svg: ink2png }]
    ]
  },

  'dev': {
    put: assets,
    out: devdir,
    ignored: ignoredExMaster,
    processors: commonProcessors,
    before: () => outputFile(
      join(devdir, 'index.html'),
      indexHtml('dev')
    )
  },

  'mir': {
    put: assets,
    out: prodir,
    ignored: ignoredExMaster,
    processors: commonProcessors,
    before: () => outputFile(
      join(prodir, 'index.html'),
      indexHtml('mir')
    )
  },

  'pro': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.png', { png: png2favs }],
      ['*', commonProcessors]
    ],
    after: () => outputFile(
      join(prodir, 'index.html'),
      indexHtml('pro', png2favs.after())
    )
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]