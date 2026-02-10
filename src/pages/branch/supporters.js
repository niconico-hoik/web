import React, { Fragment, createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { html2html, markdown2html, html2react, Style, Script, Elements, Favicons } from '../../utils'
import LINKED_DATA_GRAPHS from "../../ld"

const generateGraph = (local_business) => ({
  "@type": "WebPage",
  "@id": "https://niconico-hoik.com/supporters/#webpage",
  "url": "https://niconico-hoik.com/supporters/",
  "name": "サポーターの方へ",
  "description": "（supportersページ説明：例）協賛・支援のご案内ページ（現在準備中）です。",
  "inLanguage": "ja",
  "isPartOf": { "@id": LINKED_DATA_GRAPHS.WEBSITE['@id'] },

  "about": { "@id": local_business["@id"] },
  "mainEntity": { "@id": local_business["@id"] }

  /* 代表画像があれば（任意）
  ,"primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://niconico-hoik.com/assets/supporters.jpg"
  }
  */
})

export const render = (type, config) => {
  return html2html(`<!DOCTYPE html>${
    renderToStaticMarkup(
      <Html {...{}} />
    )
  }`).then(({ contents }) => {
    return contents
  })
}

const Html = ({}) =>
<html lang="ja">
  <Head {...{}} />
  <Body {...{}} />
</html>

const Head = ({}) =>
<head {...{ ...(true ? {} : { prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#' }) }}>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{''}</title>
  <meta name="description" content={''} />
  <meta name="robots" content="noindex,nofollow" />
</head>

const Body = ({}) =>
<body {...{
  style: {
    margin: '0em',
    lineHeight: '1.6em',
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI Variable Display, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol',
  }
}}>
  <div>{'ただいま準備中です'}</div>
</body>