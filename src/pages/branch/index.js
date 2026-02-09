import React, { Fragment, createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { x, html2html, markdown2html, html2react, Style, Script, Elements, Favicons } from '../../utils'
import LINKED_DATA_GRAPHS from "../../ld"

/* ===== WebPage（このページ = / ） ===== */
const generateGraph = (local_business) => ({
  "@type": "WebPage",
  "@id": "https://niconico-hoik.com/#home",
  "url": "https://niconico-hoik.com/",
  "name": "ニコニコ保育園 和泉中央園",
  "description": "園の概要、方針、募集情報、アクセスなどをご案内します。",
  "inLanguage": "ja",
  "isPartOf": { "@id": LINKED_DATA_GRAPHS.WEBSITE['@id'] },

  /* このページが何についてか（= campus） */
  "about": { "@id": local_business["@id"] },
  "mainEntity": { "@id": local_business["@id"] },

  /* 代表画像（任意） */
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://niconico-hoik.com/assets/hero.jpg"
  },

  /* パンくず（ページが増えてきたら使う。最初は消してOK）
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type":"ListItem","position":1,"name":"ホーム","item":"https://niconico-hoik.com/" }
    ]
  }
  */
})

const generateProps = ({ phones, prices, ...config }) => {
  return {
    ...config,

    phones: phones.map(({ name, value }) => ({
      name,
      href: `tel:${value.split('-').join('')}`,
      text: value.replace(/^\+81-/,"0"),
    })),

    prices: [...prices].sort(({ start: a }, { start: b }) =>
      a < b ? -1 : a > b ? 1 : 0
    ).map(({ start, prepaid_conditions, hours }, index, prices) => {
      return {
        start,
        disable: prices[index + 1] && new Date(prices[index + 1].start) || null,
        prepaid_conditions,
        hours,
      }
    }).filter(({ disable }) => {
      return !disable || new Date() < disable
    }),
  }
}

export const render = async (type, config, markdown, favicons) => {
  
  const article = await markdown2html(markdown).then(({ contents }) => {
    return contents.split('&#x3C;').join('<')
    // return contents.replaceAll(/&#x3C;/g, '<')
  })

  return html2html(`<!DOCTYPE html>${
    renderToStaticMarkup(
      <Html {...{ type, favicons, config: generateProps(config) }}>
        {article}
      </Html>
    )
  }`).then(({ contents }) => {
    return contents
  })
}

const Html = ({ type, favicons, config, children }) =>
<html lang="ja">
  <Head {...{ ...config, type }}>
    {favicons}
  </Head>
  <Body {...{ ...config }}>
    {children}
  </Body>
</html>

const MAIN_WIDTH = '52em'
const BASIC_COLOR = '#3d342d'
const STYLE = `
h1,h2,h3,h4,h5,h6 {
  font-weight: 500;
}
h2 {
  font-size: 1.5em;
  margin: 1.8em 0em 0em;
  border-style: solid;
  border-color: gainsboro;
  border-width: 0em 0em 0.08em;
  padding: 0em 0em 0.4em 0.0em;
}
h3 {
  font-size: 1.31em;
  margin: 1.5em 0em 0em;
}
h4 {
  font-size: 1.05em;
  margin: 1.0em 0em 0em;
}
h5 {
  font-size: 0.95em;
  margin: 1.0em 0em 0em;
}
hr {
  margin-block: 1.25em;
  border-style: solid;
  border-color: gainsboro;
  border-width: 0em 0em 0.12em;
}
p {
  margin: 1.2em 0em;
}
dl {
  padding: 0.7em 0.85em 0.7em;
  background-color: #fcfcfc;
  border-style: solid;
  border-color: #e6e6e6;
  border-width: 0.12em;
  border-radius: 0.4em;
}
dt {
  font-weight: 500;
}
dd {
  margin: 0.6em 0.85em;
}
li {
  margin: 0.5em 0em;
}
table {
  width: 100%;
  margin: 1em 0em;
}
thead {
  font-weight: 500;
}
th,td {
  font-weight: inherit;
  padding: 0.2em 0.2em 0.2em 0.2em;
  font-size: 0.85em;
  text-align: center;
}
a {
  color: dimgray;
}
main img {
  width: 100%;
}
`
.split('  ').join('')
.split('\n').join(' ')

const Head = ({ type, name, head, children: favicons }) =>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{name}</title>
  <meta name="description" content={head['description']} />
  {
  type === 'pro' ?
  <Fragment>
    <link rel="canonical" href="https://niconico-hoik.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://niconico-hoik.com/" />
    <meta property="og:site_name" content={name} />
    <meta property="og:title" content={name} />
    <meta property="og:description" content={head[':description']} />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:image" content="https://niconico-hoik.com/image/opengraph.png" />
    <meta property="og:image:alt" content={name} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={name} />
    <meta name="twitter:description" content={head[':description']} />
    <meta name="twitter:image" content="https://niconico-hoik.com/image/opengraph.png" />
    <meta name="twitter:image:alt" content={name} />

    {Array.isArray(favicons) && <Favicons>{favicons}</Favicons>}

    <Script {...{ type: 'application/ld+json' }}>
      {JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          LINKED_DATA_GRAPHS.COMPANY,
          LINKED_DATA_GRAPHS.DIVISION,
          head['@graph'],
          LINKED_DATA_GRAPHS.WEBSITE,
          generateGraph(head['@graph']),
        ],
      })}
    </Script>
  </Fragment>
  :
  <Fragment>
    <meta name="robots" content="noindex,nofollow" />
    {Array.isArray(favicons) && <Favicons>{favicons}</Favicons>}
  </Fragment>
  }
  <Style>{STYLE}</Style>
</head>

const PrepaidBrings = ({ brings }) =>
<div {...{ style: { display: 'flex', flexWrap: 'wrap', margin: '1.17em 0em 0em' } }}>
  {Object.entries(brings.filter(({ in_prepaid }) => in_prepaid).reduce((acc, { in_prepaid, ...bring }) => {
    acc[in_prepaid] = acc[in_prepaid] || []
    acc[in_prepaid] = [...acc[in_prepaid], bring]
    return acc
  }, {})).map(([in_prepaid, brings], index, types) =>
    <div {...{ key: index, style: { minWidth: '50%' } }}>
      <h4 {...{ style: { margin: 0 } }}>{in_prepaid}</h4>
      <ol>
        {brings.map(({ name, option }, index) =>
        <li {...{ key: index, style: { listStyle: 'auto' } }}>
          {`${name}${option && '*' || ''}`}
        </li>
        )}
      </ol>
    </div>
  )}
</div>

const PostpaidBrings = ({ brings }) =>
<div {...{ style: { display: 'flex', flexWrap: 'wrap', margin: '1.17em 0em 0em' } }}>
  {Object.entries(brings.filter(({ in_postpaid }) => in_postpaid).reduce((acc, { in_postpaid, ...bring }) => {
    acc[in_postpaid] = acc[in_postpaid] || []
    acc[in_postpaid] = [...acc[in_postpaid], bring]
    return acc
  }, {})).map(([in_postpaid, brings], index, types) =>
    <div {...{ key: index, style: { minWidth: '50%' } }}>
      <h4 {...{ style: { margin: 0 } }}>{in_postpaid}</h4>
      <ol>
        {brings.map(({ name, option }, index) =>
        <li {...{ key: index, style: { listStyle: 'auto' } }}>
          {`${name}${option && '*' || ''}`}
        </li>
        )}
      </ol>
    </div>
  )}
</div>

const Options = ({ brings }) =>
<dl>
  {brings.filter(({ option }) => option).map(({ name, option }) => <Fragment>
    <dt>{`${name}: ${option.value}円/${option.unit}`}</dt>
    <dd>{html2react(option.description)}</dd>
  </Fragment>)}
</dl>

const Prices = ({ prices }) =>
prices.map(({ start, disable, ...price }, index, prices) => {
  return {...{
    start,
    disable,
    ...price,
    get end() {
      return disable
      ? new Date(disable.valueOf() - (1000 * 60 * 60 * 24)).toISOString().replace(/T.+$/, '')
      : ''
    },
    get range() {
      const [startstring, endstring] = [start, this.end].map((datestring) => {
        const [year, month, mdate] = datestring
        ? datestring.split('-').map(string => Number(string))
        : []

        return year
        ? `${year}年${month}月${mdate}日`
        : ''
      })
      
      return `${startstring}~${endstring}`
    }
  }}
}).map(({ start, end, range, prepaid_conditions, hours }) =>
<div {...{ key: start, className: 'prices_version' }}>
  <h4>{range}</h4>
  <div {...{ style: { margin: '0em 0.6em' } }}>
    <div>
      <h5>{'月極利用条件'}</h5>
      <div {...{ style: { margin: '0em 1em', fontSize: '0.85em' } }}>
        {[
          `入園料: ${prepaid_conditions.enrollment}円`,
          `月初購入最小時間: ${prepaid_conditions.initial_minimum}h`,
          `追加購入最小時間: ${prepaid_conditions.additional_minimum}h`
        ].map((children, index) =>
        <p {...{ key: index, style: { margin: '0.5em 0em' } }}>
          {children}
        </p>
        )}
      </div>
    </div>
    {hours.map(({ pupil, periods }) =>
    <div {...{ key: pupil }}>
      <h5>{`年齢: ${pupil}`}</h5>
      {x({ borderBottom: '0.12em dashed #e6e6e6' }, ({ borderBottom }) =>
      <table {...{ style: { borderCollapse: 'collapse' } }}>
        <thead {...{ style: { borderBottom } }}>
          <tr {...{}}>
            {['時間帯', '利用形態', '金額'].map(key => <th {...{ key }}>{key}</th>)}
          </tr>
        </thead>
        <tbody {...{ style: { borderBottom } }}>
          {periods.reduce((acc, { key, values }, pindex) =>
            [...acc, ...values.map(({ usage, min, max, value }) => {
              return {...{
                value,
                range:
                min > 0 ? `${min}h~${max > 0 ? `${max}h` : ''}` :
                max > 0 ? `~${max}h` :
                '',
                get usage() {
                  return `${usage}${this.range && `: ${this.range}*` || ''}`
                },
              }}
            }).map(({ usage, value }, index, { length: rowSpan }) =>
              <tr {...{
                key: `${key}.${index}`,
                style: { ...(
                  index === rowSpan - 1 && pindex !== periods.length - 1
                  ? { borderBottom }
                  : {}
                ) }
              }}>
                {index === 0 &&
                <td {...{ rowSpan, style: { width: '27%' } }}>
                  {key}
                </td>}
                <td {...{ style: {} }}>
                  {usage}
                </td>
                <td {...{ style: { width: '20%' } }}>
                  {`${value}円`}
                </td>
              </tr>
            )],
            []
          )}
        </tbody>
      </table>
      )}
    </div>
    )}
  </div>
</div>
)

const flatlit = (string, separators, sepindex = 0) => {
  return (
    separators[sepindex] && string.includes(separators[sepindex])
    ?
    string.split(separators[sepindex]).reduce((acc, str, index) => {
      str = `${index === 0 ? '' : separators[sepindex]}${str}`
      return [...acc, ...flatlit(str, separators, sepindex + 1)]
    }, [])
    :
    string && [string] || []
  )
}

const deeplit = (string, sepructures, end, grab, deepindex = 0) => {
  
  const flattened = sepructures[deepindex] && flatlit(string, sepructures[deepindex]) || []

  return (
    flattened.length === 0 ? end(string)
    :
    flattened.length === 1 ? deeplit(flattened[0], sepructures, end, grab, deepindex + 1)
    :
    flattened.reduce((acc, str, index, flattened) => {
      const results = deeplit(str, sepructures, end, grab, deepindex + 1)
      const grabbed = grab(str, deepindex, index, flattened, results)
      return [...acc, ...(Array.isArray(grabbed) ? grabbed : [grabbed])]
    }, [])
  )
}

const Body = ({
  name,
  address,
  phones,
  links,
  auths,
  headers,
  supports,
  brings,
  prices,
  children,
}) =>
<body {...{
  style: {
    margin: '0em',
    lineHeight: '1.6em',
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI Variable Display, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol',
  }
}}>
  <header {...{ style: {} }}>
    <div {...{ style: { position: 'relative' } }}>
      <div {...{
        style: {
          overflowX: 'scroll',
          display: 'flex',
          // justifyContent: 'space-around',
          justifyContent: 'start',
          height: '16em',
          backgroundColor: BASIC_COLOR,
        } }}>
        {headers.map((src, index) =>
          <img {...{
            key: index,
            src,
            alt: '',
            // loading: 'lazy',
            decoding: 'async',
            style: {
              // height: '100%',
              // borderRadius: '0.4em',
              // margin: index === 0 ? '0.3em' : '0.3em 0.3em 0.3em 0em',
              // width: 'auto',
              borderRadius: '0.2em',
              marginTop: '0.2em',
              marginRight: '0.2em',
              marginBottom: '0.2em',
              // marginLeft: index === 0 ? '0em' : '0.15em',
              marginLeft: index === 0 ? '0.2em' : '0em',
            }
          }} />
        )}
      </div>
      <nav {...{
        id: 'supports',
        "aria-label": '内部スポンサーリンク',
        style: {
          position: 'absolute',
          top: '0.4em',
          right: '0.4em',
          backgroundColor: BASIC_COLOR,
          color: '#ffffff',
          borderRadius: '0.2em',
          display: 'none', //
        },
      }}>
        <a {...{
          target: '_blank',
          rel: 'noopener noreferrer',
          href: '/supporters/',
          style: {
            color: 'inherit',
          }
        }}>
          {/*
          <div {...{ style: { textAlign: 'center', fontSize: '0.5em' } }}>
            {'サポーターのみなさま'}
          </div>
          */}
          <div {...{ style: { display: 'flex', padding: '0.4em 0em' } }}>
            {[0,1,2].map((index) =>
            <div {...{
              style: {
                width: '1.75em',
                height: '1.75em',
                borderRadius: '0.2em',
                borderWidth: '0.1em',
                borderStyle: 'dashed',
                borderColor: '#604e43',
                backgroundColor: '#322a25',
                marginRight: '0.4em',
                marginLeft: index === 0 ? '0.4em' : '0em',
              }
            }}>
              {''}
            </div>
            )}
          </div>
        </a>
      </nav>
    </div>
    <div {...{
      id: 'introduction',
      style: {
        margin: 'auto',
        maxWidth: '94%',
        width: MAIN_WIDTH,
        color: BASIC_COLOR,
      }
    }}>
      <div {...{ style: { margin: '1.34em 0em' } }}>
        <h1 {...{ style: {  fontSize: '1.65em', fontWeight: '400', margin: 0 } }}>
          {name || ''}
        </h1>
        <address {...{ style: { fontSize: '0.80em' } }}>
          <a {...{ target: '_blank', rel: 'noopener noreferrer', href: address.href }}>
            <Elements>{address.value}</Elements>
          </a>
        </address>
      </div>
      <nav {...{ "aria-label": '外部リンク' }}>
        <ul {...{
          style: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            // gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // デフォルト2列
            gridTemplateColumns: '1fr',
            gap: '0.25em',
            fontSize: '0.85em',
          },
        }}>
          {[
            ...phones.map(phone => ({ ...phone, target: '' })),
            ...links.map(link => ({ ...link, target: '_blank' })),
          ].map(({ name, href, text, target }, index) =>
          <li {...{
            key: index,
            style: {
              margin: 0,
              display: 'grid',
              gridTemplateColumns: '7em 1fr', // 左:ラベル固定 / 右:値
              gap: '0em',
              alignItems: 'center',
              padding: '0.2em 0.2em',
              // border: '1px solid rgba(0,0,0,.12)',
              // borderRadius: 10,
            },
          }}>
            <span {...{ style: { whiteSpace: 'nowrap' } }}>
              {name}
            </span>
            <a {...{
              href,
              ...({ '': {}, '_blank': { target: '_blank', rel: 'noopener noreferrer' } }[target] || { target }),
              style: {
                display: 'inline-block',
                width: 'fit-content',  // 文字幅にする
                justifySelf: 'start',
                maxWidth: '100%',       // 長すぎたら枠内に収める
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                // textDecoration: 'none',
              },
            }}>
              <span {...{}}>{text}</span>
            </a>
          </li>
          )}
        </ul>
      </nav>
      <hr />
    </div>
  </header>
  <main {...{
    style: {
      margin: 'auto',
      maxWidth: '94%',
      width: MAIN_WIDTH,
      color: BASIC_COLOR,
    }
  }}>
    {x({

      sepructures: [
        // ['<hr>','<h2>'],
        ['<h2>'],
        ['<h3>'],
        ['<h4>'],
        ['<h5>'],
      ],

      end: (string) =>
      !string.includes('<h6>')
      ? html2react(string)
      : string.split('</h6>').reduce((acc, chunk, index) => {
        const [block, component] = chunk.split('<h6>')
        return [...acc, ...html2react(block), ...(
          component === 'PrepaidBrings' ? [PrepaidBrings({ brings })] :
          component === 'PostpaidBrings' ? [PostpaidBrings({ brings })] :
          component === 'Options' ? [Options({ brings })] :
          component === 'Prices' ? [Prices({ prices })] :
          []
        )]
      }, []),

      grab: (string, deepindex, index, { length }, children) =>
      deepindex > 0 && (index === 0 && length > 1)
      ? children
      : deepindex === 0 && index === 0
      ? createElement('header', {}, children)
      : deepindex === 0 && index === length - 1 && /^\<hr\>/.test(string)
      ? createElement('footer', {}, children)
      : createElement('section', {}, children),

    }, ({ sepructures, end, grab }) =>
    <article {...{}}>
      {deeplit(children, sepructures, end, grab)}
      <footer>
        <hr />
        <div {...{ style: { margin: '2.5em 0em' } }}>
          <p>
            {'見学 / お試し保育 / 月極利用 / 一時預かり 等々、お気軽にご相談ください🏠'}
          </p>
          <p>
            {[
              ...phones,
              {
                name: '受付時間',
                href: null,
                text: '08:00-18:00（盆・年末年始を除く）',
              }
            ].map(({ name, href, text }) =>
            <div {...{ style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5em' } }}>
              <span {...{ style: { whiteSpace: 'nowrap' }}}>
                {name}{':'}
              </span>
              {href
              ?
              <a {...{ href, style: { whiteSpace: 'nowrap' }}}>
                {text}
              </a>
              :
              <span {...{ style: { whiteSpace: 'nowrap' } }}>
                {text}
              </span>
              }
            </div>
            )}
          </p>
        </div>
      </footer>
    </article>
    )}
  </main>
  <footer {...{ style: { background: BASIC_COLOR, color: '#81756c', padding: '1.5em 1.5em' } }}>
    {x({ margin: 0 }, ({ margin }) =>
    <div {...{ style: { fontSize: '0.85em', lineHeight: 'normal', textAlign: 'right' } }}>
      <address>
        <p {...{ style: { margin } }}>
          {'合同会社EVNR / 保育総合事業部'}
        </p>
        {/* <p>
          {'〒590-0432 大阪府泉南郡熊取町小垣内1-5-28'}
        </p> */}
        <p {...{ style: { margin } }}>
          <a {...{ href: 'mailto:branch.hoik@evnr.ing', style: { color: 'inherit' } }}>
            {'branch.hoik@evnr.ing'}
          </a>
        </p>
      </address>
      <p {...{ style: { margin } }}>
        {'© 合同会社EVNR'}
      </p>
    </div>
    )}
  </footer>
</body>