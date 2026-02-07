import { createElement } from 'react'
import unified from 'unified'
import html2hast from 'rehype-parse'
import hast2react from 'rehype-react'

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