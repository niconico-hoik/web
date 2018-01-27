import React from 'react'
import { markdownToHtml } from 'lonogara-tool/build'
import chinPluginsInkscape from 'chin-plugins-inkscape'
import chinPluginsImagemin from 'chin-plugins-imagemin'
import chinPluginsHtmlEmbed from 'chin-plugins-html-embed'

const MarkdownToHtml = opts => {
  opts.ext = '.html'
  return data => markdownToHtml(data)
}

export default Object.assign({},
  { MarkdownToHtml },
  chinPluginsInkscape(),
  chinPluginsImagemin({}),
  chinPluginsHtmlEmbed({
    out: 'index.html',
    env: {
      "DEVELOPMENT": {
        props: ['onerror.js'],
        component: (props) =>
        <html lang="ja">
          <head>
            {props['onerror.js']}
          </head>
          <body>
            <div id="app" />
            <script src="./dll.js" />
            <script src="./bundle.js" />
          </body>
        </html>
      },
      "PRODUCTION:LIGHT": {
        props: ['onerror.js'],
        component: (props) =>
        <html lang="ja">
          <head>
            {props['onerror.js']}
          </head>
          <body>
            <div id="app" />
            <script src="./bundle.js" />
          </body>
        </html>
      },
      "PRODUCTION:MASTER": {
        EmbedFavicons: {
          appName: 'ニコニコ保育園 和泉中央園',
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
        },
        props: ['favicons.png', 'ganalytics.js'],
        component: (props) =>
        <html lang="ja">
          <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
            <title>ニコニコ保育園 和泉中央園</title>
            <meta charSet="utf-8" />
            <meta name="keywords" content="ニコニコ保育園,大阪,和泉市,いずみ,のぞみ野,保育園,ほいくえん,保育,ほいく,認可外,一時預かり,一時" />
            <meta name="description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」を保育方針に日々を励むニコニコ保育園 和泉中央園は2016年11月にのぞみ野の2丁目から3丁目へと少しだけ場所を変えてリスタートしました" />
            <meta name="fragment" content="!" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ja_JP" />
            <meta property="og:url" content="https://niconico-hoik.com" />
            <meta property="og:site_name" content="niconico-hoik.com" />
            <meta property="og:image" content="./image/opengraph.png" />
            <meta property="og:title" content="ニコニコ保育園 和泉中央園" />
            <meta property="og:description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」、以上でも以下でもない当園の保育方針です" />
            {props['favicons.png']}
            {props['ganalytics.js']}
          </head>
          <body>
            <div id="app" />
            <script src="./bundle.js" />
          </body>
        </html>
      }
    }
  })
)