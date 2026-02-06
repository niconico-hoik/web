import React, { Fragment, createElement } from 'react'
import unified from 'unified'
import html2hast from 'rehype-parse'
import hast2react from 'rehype-react'

const MAIN_WIDTH = '52em'
const BASIC_COLOR = '#3d342d'

export const generateProps = ({ prices, ...config }) => {
  return {
    ...config,
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

const { html2react, Relement } = {...{
  processor: unified().use([
    [html2hast, { fragment: true }],
    [hast2react, { createElement }],
  ]),
  get html2react() {
    return (html) => {
      return this.processor.processSync(`<div>${html}</div>`).contents.props.children
      // .filter((child) => typeof child === 'object')
    }
  },
  get Relement() {
    return ({ children }) => this.html2react(children)
  },
}}

const Brings = ({ brings }) =>
<div {...{ style: { display: 'flex', flexWrap: 'wrap', margin: '1.17em 0em' } }}>
  {Object.entries(brings.reduce((acc, { in_prepaid, ...bring }) => {
    acc[in_prepaid] = acc[in_prepaid] || []
    acc[in_prepaid] = [...acc[in_prepaid], bring]
    return acc
  }, {})).map(([in_prepaid, brings], index, types) =>
    <div {...{ id: `brings_type_${index}`, style: { minWidth: '50%' } }}>
      <h3 {...{ style: { margin: 0 } }}>{in_prepaid}</h3>
      <ol>
        {brings.map(({ name, in_postpaid, option }, index) =>
        <li {...{ key: index, style: { listStyle: 'auto' } }}>
          {`${name}${in_postpaid}${option ? `【オプション: ${option.value}円/${option.unit}】` : ''}`}
        </li>
        )}
      </ol>
    </div>
  )}
</div>

const PrepaidBrings = ({ brings }) =>
<div {...{ style: { display: 'flex', flexWrap: 'wrap', margin: '1.17em 0em 0em' } }}>
  {Object.entries(brings.filter(({ in_prepaid }) => in_prepaid).reduce((acc, { in_prepaid, ...bring }) => {
    acc[in_prepaid] = acc[in_prepaid] || []
    acc[in_prepaid] = [...acc[in_prepaid], bring]
    return acc
  }, {})).map(([in_prepaid, brings], index, types) =>
    <div {...{ id: `brings_type_${index}`, style: { minWidth: '50%' } }}>
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
    <div {...{ id: `brings_type_${index}`, style: { minWidth: '50%' } }}>
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
      <table>
        <thead>
          <tr>{['時間帯', '利用形態', '金額'].map(key => <th {...{ key }}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {periods.reduce((acc, { key, values }) =>
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
            }).map(({ usage, value }, index) =>
              <tr {...{ key: `${key}.${index}` }}>
                <td {...{ style: { width: '27%' } }}>
                  {index === 0 ? key : ''}
                </td>
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
    </div>
    )}
  </div>
</div>
)

const Auths = ({ auths }) =>
<div {...{ id: 'auths', className: 'article_block' }}>
  <div {...{ className: 'article_block_contents' }}>
    <h2>{'アカウント登録'}</h2>
    <div>
      <p>{'お客様の所有する各種サービスのアカウントをご登録いただくことができます。ご興味がございましたらお気軽にお問い合わせください。'}</p>
    </div>
    {auths.includes('line') &&
    <div>
      <h3>{'LINE'}</h3>
      <div {...{ style: { margin: '0em 0.75em' } }}>
        <p>{'ご予約やご相談などの連絡をLINEを通して行うことができます。ご来園の際に当園のスマートフォンにお友達として登録をする形となります。'}</p>
      </div>
    </div>
    }
    {auths.includes('google') &&
    <div>  
      <h3>{'Google'}</h3>
      <div {...{ style: { margin: '0em 0.75em' } }}>
        <p>{'GooglePhotosなどのGoogle系サービスに非公開で投稿されるコンテンツにアクセスできるようになります。ご来園の際に当園のスマートフォンに表示されるQRコードを読み取っていただき、お客様のスマートフォンを通してGoogleメールアドレスを送信していただく形となります。'}</p>
      </div>
    </div>
    }
    {/* <div>
      <p>{'興味のある方はお気軽にお問い合わせください。'}</p>
    </div> */}
  </div>
</div>

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

const Article = ({ brings, prices, auths, children, ...props }) => {

  const sepructures = [
    ['<hr>','<h2>'],
    ['<h3>'],
    ['<h4>'],
    ['<h5>'],
  ]

  const end = (string) =>
  !string.includes('<h6>')
  ? html2react(string)
  : string.split('</h6>').reduce((acc, chunk, index) => {
    const [block, component] = chunk.split('<h6>')
    return [...acc, ...html2react(block), ...(
      component === 'PrepaidBrings' ? [PrepaidBrings({ brings })] :
      component === 'PostpaidBrings' ? [PostpaidBrings({ brings })] :
      component === 'Options' ? [Options({ brings })] :
      component === 'Prices' ? [Prices({ prices })] :
      component === 'Auths' ? [Auths({ auths })] :
      []
    )]
  }, [])

  const grab = (string, deepindex, index, { length }, children) =>
  deepindex > 0 && (index === 0 && length > 1)
  ? children
  : deepindex === 0 && index === 0
  ? createElement('header', {}, children)
  : deepindex === 0 && index === length - 1
  ? createElement('footer', {}, children)
  : createElement('section', {}, children)

  return <article {...props}>{deeplit(children, sepructures, end, grab)}</article>
}

export const stylestring = `
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
footer p {
  margin: 0;
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

export default ({
  name,
  phone,
  address,
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
          // height: '17em',
          // height: '19em',
          // height: '16.75em',
          backgroundColor: BASIC_COLOR,
          // backgroundColor: 'antiquewhite',
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
          // width: '10em',
          // padding: '2em',
          // backgroundColor: '#537967',
          backgroundColor: BASIC_COLOR,
          color: '#ffffff',
        },
      }}>
        <a {...{
          target: '_blank',
          rel: 'noopener noreferrer',
          href: 'https://www.google.com/search?q=%E3%82%B5%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC',
          style: {
            // display: 'contents',
            display: 'block',
            color: 'inherit',
          }
        }}>
          {/* <div {...{ style: { textAlign: 'center', fontSize: '0.5em' } }}>
            {'サポーターのみなさま'}
          </div> */}
          <div {...{ style: { display: 'flex', margin: '0.4em 0em' } }}>
            {[0,1,2].map((index) =>
            <div {...{
              style: {
                // display: 'inline-block',
                width: '1.75em',
                height: '1.75em',
                marginRight: '0.4em',
                marginLeft: index === 0 ? '0.4em' : '0em',
                // margin: index === 0 ? '0em 0.3em' : '0em 0.3em 0em 0em',
                borderWidth: '0.1em',
                borderStyle: 'dashed',
                borderColor: '#604e43',
                backgroundColor: '#322a25',
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
          <a {...{ target: '_blank', href: address.href }}>
            <Relement>{address.value}</Relement>
          </a>
        </address>
      </div>
      <nav {...{ "aria-label": '外部リンク' }}>
        <table>
          <tbody>
            {[
              { name: 'phone', href: `tel:${phone}`, text: phone, target: null },
              ...links.map(link => ({ ...link, target: '_blank' })),
            ].map(({ name, href, text, target }) =>
            <tr {...{ key: name }}>
              <td {...{ style: { textAlign: 'left', width: 0, paddingRight: '1.5em' } }}>
                {name}
              </td>
              <td {...{ style: { textAlign: 'left' } }}>
                <a {...{
                  href,
                  ...(!target ? {} : {
                    target,
                    ...(target === '_blank' ? { rel: 'noopener noreferrer' } : {})
                  })
                }}>
                  <Relement>{text}</Relement>
                </a>
              </td>
            </tr>
            )}
          </tbody>
        </table>
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
    <Article {...{ brings, prices, auths }}>
      {children}
    </Article>
  </main>
  <footer {...{ style: { background: BASIC_COLOR, color: '#81756c', padding: '1.5em 1.5em' } }}>
    <div {...{ style: { fontSize: '0.85em', lineHeight: 'normal', textAlign: 'right' } }}>
      <address>
        <p>{'合同会社EVNR / 保育総合事業部'}</p>
        <p>{'〒590-0432 大阪府泉南郡熊取町小垣内1-5-28'}</p>
        <p>
          <a {...{ href: 'mailto:branch.hoik@evnr.ing', style: { color: 'inherit' } }}>
            {'branch.hoik@evnr.ing'}
          </a>
        </p>
      </address>
      <p>{'© 合同会社EVNR'}</p>
    </div>
  </footer>
</body>