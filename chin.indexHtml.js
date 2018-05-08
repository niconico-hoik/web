import unified from 'unified'
import html2hast from 'rehype-parse'
import hastformat from 'rehype-format'
import hast2react from 'rehype-react'
import hast2html from 'rehype-stringify'
import React, { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export const TITLE = 'ニコニコ保育園 和泉中央園'

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
  ga('create', 'UA-73760794-3', 'auto')
  ga('send', 'pageview')`
)

const onerror = createScript(`
  window.onerror = e => {
    document.body.removeChild(document.getElementById('app'))
    const div = document.createElement('div')
    div.innerText = e
    div.style.fontSize = '40px'
    document.body.appendChild(div)
  }`
)

const DevIndexHtml = () =>
<html lang="ja">
  <head>
    {onerror}
  </head>
  <body>
    <div id="app" />
    <script src="./dll.js" />
    <script src="./bundle.js" />
  </body>
</html>

const MirrorIndexHtml = () =>
<html lang="ja">
  <head>
    {onerror}
  </head>
  <body>
    <div id="app" />
    <script src="./bundle.js" />
  </body>
</html>

const ProIndexHtml = ({ favicons }) =>
<html lang="ja">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
    <title>{TITLE}</title>
    <meta charSet="utf-8" />
    <meta name="keywords" content="ニコニコ保育園,大阪,和泉市,いずみ,のぞみ野,保育園,ほいくえん,保育,ほいく,認可外,一時預かり,一時" />
    <meta name="description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」を保育方針に日々を励むニコニコ保育園 和泉中央園は2016年11月にのぞみ野の2丁目から3丁目へと少しだけ場所を変えてリスタートしました" />
    <meta name="fragment" content="!" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:url" content="https://niconico-hoik.com" />
    <meta property="og:site_name" content="niconico-hoik.com" />
    <meta property="og:image" content="./image/opengraph.png" />
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」、以上でも以下でもない当園の保育方針です" />
    {favicons}
    {ga}
  </head>
  <body>
    <div id="app" />
    <script src="./bundle.js" />
  </body>
</html>

export default (type, faviconsElements) =>
unified()
.use([
  html2hast,
  hastformat,
  hast2html
])
.processSync('<!DOCTYPE html>' + renderToStaticMarkup(
  type === 'development'
  ? <DevIndexHtml /> :
  type === 'mirror'
  ? <MirrorIndexHtml /> :
  type === 'production'
  ? <ProIndexHtml favicons={
    unified()
    .use([
      [html2hast, { fragment: true }],
      [hast2react, { createElement }]
    ])
    .processSync(faviconsElements.join(''))
    .contents
    .props
    .children
  } />
  : false
))
.contents