import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import presetM2H from 'lonogara-sdk/unified/m2h'
import { readFile, outputFile } from 'fs-extra'
import { join } from 'path'
import { type } from 'os'
import { devdir, prodir } from './.variables.js'
import { renderBranch } from './src/pages'
import izumichuoConfig from './src/branches/izumichuo'

export const outputIndexHtml = async (type, outdir, favicons) => {
  const files = await Promise.all([
    readFile(
      join('src', 'branches', 'izumichuo', 'main.md'),
      'utf8'
    ).then(izumichuoMarkdown => {
      return renderBranch(
        type,
        izumichuoConfig,
        izumichuoMarkdown,
        favicons
      )
    }).then(izumichuoHtml => {
      return ['index.html', izumichuoHtml]
    })
  ])

  return Promise.all(files.map(([name, contents]) => {
    return outputFile(join(outdir, name), contents)
  }))
}

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
      appName: izumichuoConfig.name,
      description: null,
      dir: "auto",
      lang: "ja-JP",
      display: "browser",
      orientation: "any",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#ffffff",
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
    before: () => outputIndexHtml('dev', devdir),
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
    after: () => outputIndexHtml('mir', prodir, svg2fav.after())
  },

  'pro': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.svg', faviconsProcessors],
      ['*', commonProcessors]
    ],
    after: () => outputIndexHtml('pro', prodir, svg2fav.after())
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]