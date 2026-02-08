import { createElement } from 'react'
import unified from 'unified'
import md2mdast from 'remark-parse'
import mdast2gfm from 'remark-gfm'
import mdast2hast from 'remark-rehype'
import html2hast from 'rehype-parse'
import hastformat from 'rehype-format'
import hast2html from 'rehype-stringify'
import hast2react from 'rehype-react'

export const x = (args, fn) => fn(args)

export const { markdown2html } = {...{ get markdown2html() {
  const processor = unified().use([
    [md2mdast, {}],
    [mdast2gfm, {}],
    [mdast2hast, { allowDangerousHtml: true }],
    [hast2html, { allowDangerousHtml: true }],
  ])

  return (markdown) => {
    return processor.process(markdown)
  }
}}}

export const { html2html } = {...{ get html2html() {
  const processor = unified().use([
    [html2hast, {}],
    [hastformat, {}],
    [hast2html, {}],
  ])
  return (html) => {
    return processor.process(html)
  }
}}}

export const Script = ({ children: __html, ...props }) => {
  return createElement('script', {
    ...props,
    dangerouslySetInnerHTML: { __html }
  })
}

export const Style = ({ children: __html, ...props }) => {
  return createElement('style', {
    ...props,
    dangerouslySetInnerHTML: { __html }
  })
}

export const { html2react } = {...{ get html2react() {
  const processor = unified().use([
    [html2hast, { fragment: true }],
    [hast2react, { createElement }],
  ])
  return (html) => {
    return processor.processSync(`<div>${html}</div>`).contents.props.children
  }
}}}

export const Elements = ({ children }) => html2react(children)

export const Favicons = ({ children: favicons }) => html2react(favicons.join(''))