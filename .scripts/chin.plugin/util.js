import unified from 'unified'
import htmlToHast from 'rehype-parse'
import hastToFormat from 'rehype-format'
import hastToReactElement from 'rehype-react'
import hastToHtml from 'rehype-stringify'
import { createElement } from 'react'

export const htmlToFormat = (html, fragment) =>
  unified()
    .use(htmlToHast, { position: false, fragment })
    .use(hastToFormat)
    .use(hastToHtml)
    .processSync(html).contents

export const htmlToReactElement = html =>
  unified()
    .use(htmlToHast, { position: false, fragment: true })
    .use(hastToReactElement, { createElement })
    .processSync(html).contents
