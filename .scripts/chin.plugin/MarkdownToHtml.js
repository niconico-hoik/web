import { markdownToHtml } from 'ligure-tool/build'
// import { htmlToFormat } from './util.js'

export default opts => {
  opts.ext = '.html'
  return data => markdownToHtml(data)
  // .then(({ contents }) => htmlToFormat(contents, true))
}
