import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import presetM2H from 'lonogara-sdk/unified/m2h'
import { readFile, outputFile } from 'fs-extra'
import { join } from 'path'
import generateIndexHtml, { TITLE } from './chin.indexHtml.js'
import izumichuoConfig from './src/branches/izumichuo/config.js'
import { devdir, prodir } from './.variables.js'
import { type } from 'os'

/* extensions */

const ink2pdf = inkscape('pdf')
const ink2png = inkscape('png', { width: 2000, background: '#ffffff' })

/*
const md2html = unified('.html', presetM2H())

const img2min = imagemin({
  gifsicle: {},
  jpegtran: {},
  optipng: {},
  svgo: {}
})

const svg2fav = favicons({
  nameAsDir: true,
  config: {
    path: 'favicons',
    appName: TITLE
  }
})
*/

export const outputIndexHtml = async (out, type, favicons) => {
  const izumichuoMarkdown = await readFile(
    join('src', 'branches', 'izumichuo', 'main.md'),
    'utf8'
  )

  const indexHtml = await generateIndexHtml(
    izumichuoConfig,
    izumichuoMarkdown,
    { type, favicons }
  )

  return outputFile(out, indexHtml)
}


/* configs */

const assets = 'frame'

const { result: commonProcessors } = {...{
  md2html: unified('.html', presetM2H()),
  img2min: imagemin({
    gifsicle: {},
    jpegtran: {},
    optipng: {},
    svgo: {}
  }),
  get result() { return {
    md: this.md2html,
    png: this.img2min,
    jpg: this.img2min,
    svg: this.img2min,
  }},
}}

const { svg2fav, result: faviconsProcessors } = {
  svg2fav: favicons({
    nameAsDir: true,
    config: {
      path: 'favicons',
      appName: TITLE
    }
  }),
  get result() { return {
    svg: this.svg2fav
  }},
}

const configs = {

  'pre': {
    put: 'preframe',
    out: assets,
    ignored: [
      'index.md',
    ],
    processors: [
      ['pdf', { svg: ink2pdf }],
      ['*', { svg: ink2png }]
    ]
  },

  'dev': {
    put: assets,
    out: devdir,
    ignored: [
      'favicons.svg',
      '_redirects',
      '**.txt',
      '**.xml'
    ],
    processors: commonProcessors,
    before: () => outputIndexHtml(
      join(devdir, 'index.html'),
      'dev'
    ),
  },

  'mir': {
    put: assets,
    out: prodir,
    ignored: [
      '_redirects',
      '**.txt',
      '**.xml'
    ],
    processors: [
      ['favicons.svg', faviconsProcessors],
      ['*', commonProcessors]
    ],
    after: () => outputIndexHtml(
      join(prodir, 'index.html'),
      'mir',
      svg2fav.after()
    )
  },

  'pro': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.svg', faviconsProcessors],
      ['*', commonProcessors]
    ],
    after: () => outputIndexHtml(
      join(prodir, 'index.html'),
      'pro',
      svg2fav.after()
    )
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]