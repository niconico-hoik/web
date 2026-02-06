import { readFile, outputFile } from 'fs-extra'
import unified from 'unified'
import html2hast from 'rehype-parse'
import hastformat from 'rehype-format'
import hast2react from 'rehype-react'
import md2mdast from 'remark-parse'
import mdast2gfm from 'remark-gfm'
import mdast2hast from 'remark-rehype'
import hast2html from 'rehype-stringify'
import mdast2html from 'remark-html'
import React, { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
// import { JSDOM } from 'jsdom'
import Branch, { stylestring, generateProps } from './src/pages/branch'

export const TITLE = 'ニコニコ保育園 和泉中央園'

const GA_ID = 'UA-73760794-3'

const DESCRIPTION =
'生後2か月～小学校高学年を対象に「こどもの多彩な可能性が育まれるようサポート」する認可外保育園です。' +
'日々の様子を画像・動画から紹介しています。' +
'また、料金シミュレーションを月極・一時預かりともに用意しております。' +
'申込みに限らず見学やお試し保育について等、お気軽にお問い合わせください。'

const ogs =
<Fragment>
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:url" content="https://niconico-hoik.com" />
  <meta property="og:site_name" content="niconico-hoik.com" />
  <meta property="og:image" content="./image/opengraph.png" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content="大阪府和泉市の「こどもの多彩な可能性が育まれるようサポート」する認可外保育園" />
</Fragment>

const createScript = (__html) => createElement('script', { dangerouslySetInnerHTML: { __html } })

const ga = createScript(`
  ;(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function() {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  ga('create', '${GA_ID}', 'auto')
  ga('send', 'pageview')
`)

const onerror = createScript(`
  window.onerror = e => {
    console.error(e);
    document.body.removeChild(document.getElementById('app'))
    const div = document.createElement('div')
    div.innerText = e
    div.style.fontSize = '40px'
    document.body.appendChild(div)
  }
`)

/*
const Head = ({ children }) =>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  {children}
</head>
*/

const HeadDev = () =>
<Fragment>
  {/* {onerror} */}
  <script defer={true} src="./dll.js" />
  <script defer={true} src="./bundle.js" />
</Fragment>

const HeadMir = ({ favicons }) =>
<Fragment>
  {ogs}
  {favicons}
  {/* {onerror} */}
  <script defer={true} src="./bundle.js" />
</Fragment>

const HeadPro = ({ favicons }) =>
<Fragment>
  <title>{TITLE}</title>
  {/* <meta charSet="utf-8" /> */}
  <meta name="keywords" content="ニコニコ保育園,大阪,和泉市,いずみ,のぞみ野,保育園,ほいくえん,保育,ほいく,認可外,一時預かり,一時" />
  <meta name="description" content={DESCRIPTION} />
  <meta name="fragment" content="!" />
  {ogs}
  {favicons}
  {ga}
  <script defer={true} src="./bundle.js" />
</Fragment>

const IndexHtml = ({ type, favicons, style, children }) =>
<html lang="ja">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>ニコニコ保育園 和泉中央園</title>
    <meta name="description" content={DESCRIPTION} />
    <meta name="keywords" content="ニコニコ保育園,大阪,和泉市,いずみ,のぞみ野,保育園,ほいくえん,保育,ほいく,認可外,一時預かり,一時" />
    {
      type === 'dev' ? <HeadDev /> :
      type === 'mir' ? <HeadMir {...{ favicons }} /> :
      type === 'pro' ? <HeadPro {...{ favicons }} /> :
      <Fragment></Fragment>
    }
    <style>{style}</style>
  </head>
  {children}
</html>

const favicons2elements = (favicons) =>
unified()
.use([
  [html2hast, { fragment: true }],
  [hast2react, { createElement }]
])
.processSync(favicons.join(''))
.contents
.props
.children

export default async (config, markdown, { type, favicons } = {}) => {
  return unified().use([
    [md2mdast, {}],
    [mdast2gfm, {}],
    [mdast2hast, { allowDangerousHtml: true }],
    [hast2html, { allowDangerousHtml: true }],
  ]).process(
    markdown
  ).then(({ contents }) => {
    return contents.split('&#x3C;').join('<')
    // return contents.replaceAll(/&#x3C;/g, '<')
  }).then(main => {
    return renderToStaticMarkup(
      <IndexHtml {...{
        type,
        favicons: favicons && favicons2elements(favicons) || null,
        style: stylestring,
      }}>
        <Branch {...generateProps(config)}>
          {main}
        </Branch>
      </IndexHtml>
    )
  }).then(rendered => {
    return unified().use([
      [html2hast, {}],
      [hastformat, {}],
      [hast2html, {}],
    ]).process(
      `<!DOCTYPE html>${rendered}`
    )
  }).then(({ contents }) => {
    return contents
  })
}

/*
export const IndexMarkdown2IndexHtml = async ({ put, out, type, favicons }) => {
  // return readFile()
  return outputFile(
    out,
    unified()
    .use([
      html2hast,
      hastformat,
      hast2html
    ])
    .processSync('<!DOCTYPE html>' + renderToStaticMarkup(
      <IndexHtml {...{
        type,
        favicons: favicons && favicons2elements(favicons) || null,
      }} />
    ))
    .contents
  )
}
*/