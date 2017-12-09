import { transform as babelTransform } from 'babel-core'
import { createElement } from 'react'
import htmlBomb from './.html'

export default opts => {
  return data => {
    const { code } = babelTransform(data, babelConfig)
    const script = createElement('script', {
      dangerouslySetInnerHTML: { __html: code }
    })
    htmlBomb.setProp(opts.name, script)
    return
  }
}

const babelConfig = {
  presets: [
    ['env', { targets: { browsers: ['last 2 versions', 'safari >= 7'] } }]
  ],
  compact: true,
  minified: true,
  comments: false
}
