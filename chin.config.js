import inkscape from 'chin-plugin-inkscape'
import favicons from 'chin-plugin-favicons'
import unified from 'chin-plugin-unified'
import imagemin from 'chin-plugin-imagemin'
import presetM2H from 'lonogara-sdk/unified/m2h'
import { readFile, outputFile } from 'fs-extra'
import { join } from 'path'
import { type } from 'os'
import { devdir, prodir } from './.variables.js'
import { renderBranch, renderSupporters } from './src/pages'
import * as branches from './src/branches/index.js'

export const outputHtmls = async (type, outdir, favicons) => {
  return Promise.all(
    [
      'izumichuo', // must be the only.
    ].reduce((acc, branch) => [...acc, ...Object.entries({

      'index.html': readFile(join('src', 'branches', branch, 'article.md'), 'utf8').then(branchMarkdown => {
        return renderBranch(type, branches[branch], branchMarkdown, favicons)
      }),

      'supporters/index.html': renderSupporters(type, branches[branch]),

    }).map(([filename, promise]) => {
      return promise.then(contents => [filename, contents])
    })], [])
  ).then(files => Promise.all(
    [...files, ...Object.entries({

    })].map(([filename, contents]) => {
      return outputFile(join(outdir, filename), contents)
    }))
  )
}

const assets = 'frame'
const ink2pdf = inkscape('pdf')
const ink2png = inkscape('png', { width: 2000, background: '#ffffff' })

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
      appName: branches['izumichuo'].name,
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
    before: () => outputHtmls('dev', devdir),
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
    after: () => outputHtmls('mir', prodir, svg2fav.after())
  },

  'pro': {
    put: assets,
    out: prodir,
    processors: [
      ['favicons.svg', faviconsProcessors],
      ['*', commonProcessors]
    ],
    after: () => outputHtmls('pro', prodir, svg2fav.after())
  }

}

const { npm_lifecycle_event } = process.env
const suffix = npm_lifecycle_event.split(':')[1]
export default configs[suffix]