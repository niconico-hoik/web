import React, { Fragment, createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { html2html, markdown2html, html2react, Style, Script, Elements, Favicons } from '../../utils'

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