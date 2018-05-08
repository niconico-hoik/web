import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import mdast2hast from 'remark-rehype'
import hastraw from 'rehype-raw'
import hastalign from 'lonogara-sdk/.packages/rehype-align'
import hastblank from 'lonogara-sdk/.packages/rehype-blank'
import hastminify from 'rehype-minify-whitespace'
import { outputFile } from 'fs-extra'
import { join } from 'path'
import indexHtml, { TITLE } from './chin.indexHtml.js'
import { devdir, prodir } from './.variables.js'

console.log(process.cwd())

/* extensions */

const width = 1024
const ink2pdf = inkscape('pdf', { width })
const ink2png = inkscape('png', { width, background: '#ffffff' })

const m2h = unified('m2h', {
  parse: { commonmark: true },
  plugins: [
    [mdast2hast, { allowDangerousHTML: true }],
    hastraw,
    hastalign,
    hastblank,
    hastminify
  ]
})

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
  'inkschin': {
    put: 'preframe',
    out: assets,
    processors: [
      ['pdf', { svg: ink2pdf }],
      ['*', { svg: ink2png }]
    ]
  },
  'development': {
    put: assets,
    out: devdir,
    ignored: ignoredExMaster,
    processors: commonProcessors,
    before: () => outputFile(
      join(devdir, 'index.html'),
      indexHtml('development')
    )
  },
  'mirror': {
    put: assets,
    out: prodir,
    ignored: ignoredExMaster,
    processors: commonProcessors,
    before: () => outputFile(
      join(prodir, 'index.html'),
      indexHtml('mirror')
    )
  },
  'production': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.png', { png: png2favs }],
      ['*', commonProcessors]
    ],
    after: () => outputFile(
      join(prodir, 'index.html'),
      indexHtml('production', png2favs.after())
    )
  }
}

export default configs[process.env.CHIN_ENV]