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
import Branch, { stylestring, generateProps } from './src/pages/branch'

export const TITLE = 'ニコニコ保育園 和泉中央園'

const GA_ID = 'UA-73760794-3'

const DESCRIPTION =
'生後2か月～小学校高学年を対象に「こどもの多彩な可能性が育まれるようサポート」する認可外保育園です。' +
'日々の様子を画像・動画から紹介しています。' +
'また、料金シミュレーションを月極・一時預かりともに用意しております。' +
'申込みに限らず見学やお試し保育について等、お気軽にお問い合わせください。'

const LINKINGDATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ChildCare",
      "name": "ニコニコ保育園 和泉中央園",
      "url": "https://niconico-hoik.com/",
      "description": "生後2か月～小学校高学年を対象に「こどもの多彩な可能性が育まれるようサポート」する認可外保育園",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "JP",
        "addressRegion": "大阪府",
        "addressLocality": "和泉市",
        "streetAddress": "のぞみ野3丁目4-17 Shima.B.L.D 1F",
        "postalCode": "594-1105"
      }
    },
    {
      "@type": "Organization",
      "name": "合同会社EVNR 保育総合事業部",
      "email": "branch.hoik@evnr.ing",
      "telephone": "+81-90-8231-4457",
      "url": "https://niconico-hoik.com/",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "JP",
        "addressRegion": "大阪府",
        "addressLocality": "泉南郡熊取町",
        "streetAddress": "小垣内1-5-28",
        "postalCode": "590-0432"
      },
    }
  ]
}

const ga = 
`;(function(i, s, o, g, r, a, m) {
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
ga('send', 'pageview')`

const Script = ({ children: __html, ...props }) => {
  return createElement('script', {
    ...props,
    dangerouslySetInnerHTML: { __html }
  })
}

const Style = ({ children: __html, ...props }) => {
  return createElement('style', {
    ...props,
    dangerouslySetInnerHTML: { __html }
  })
}

const Favicons = ({ children: favicons }) =>
unified()
.use([
  [html2hast, { fragment: true }],
  [hast2react, { createElement }]
])
.processSync(favicons.join(''))
.contents
.props
.children

const Head = ({ type, children: favicons }) =>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  {
  type === 'pro' ?
  <Fragment>
    <link rel="canonical" href="https://niconico-hoik.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:url" content="https://niconico-hoik.com/" />
    <meta property="og:image" content="https://niconico-hoik.com/image/opengraph.png" />
    <meta property="og:site_name" content={TITLE} />
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content="大阪府和泉市の「こどもの多彩な可能性が育まれるようサポート」する認可外保育園" />

    <meta name="twitter:card" content="summary_large_image" />

    {Array.isArray(favicons) && <Favicons>{favicons}</Favicons>}

    <Script {...{ type: 'application/ld+json' }}>
      {JSON.stringify(LINKINGDATA)}
    </Script>

    {/* <Script {...{ type: 'text/javascript' }}>
      {ga}
    </Script> */}
  </Fragment>
  :
  <Fragment>
    <meta name="robots" content="noindex,nofollow" />
    {Array.isArray(favicons) && <Favicons>{favicons}</Favicons>}
  </Fragment>
  }
  <Style>{stylestring}</Style>
</head>

export default async (type, config, markdown, favicons) => {
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
  }).then(article => {
    return renderToStaticMarkup(
      <html lang="ja">
        <Head {...{ type }}>
          {favicons}
        </Head>
        <Branch {...generateProps(config)}>
          {article}
        </Branch>
      </html>
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