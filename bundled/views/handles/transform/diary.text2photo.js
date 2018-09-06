import { parseFromString } from '../util.js'
import { body2caption, extractTitle } from './util.js'

const sizes = [
  1280,
  640,
  540,
  500,
  400,
  250,
  100
]

const url2urls = (url) => sizes.map(size => {
  const urlSplited = url.split('_')
  const lastFragmentSplited = urlSplited[urlSplited.length - 1].split('.')
  lastFragmentSplited[0] = size
  urlSplited[urlSplited.length - 1] = lastFragmentSplited.join('.')
  return urlSplited.join('_')
})

export default ({ summary, body }) => {

  const { body: bodyDOM } = parseFromString(body)

  const imgs = Array.from(bodyDOM.querySelectorAll('img'))

  return {
    type: 'photo',
    slug: extractTitle(bodyDOM) || summary,
    caption: body2caption(bodyDOM),
    photoset_layout: imgs.map(() => 1).join(''),
    photos: imgs.map(({ src, dataset }) => {
      const urls   = url2urls(src)
      const height = +dataset['origHeight']
      const width  = +dataset['origWidth']
      return {
        alt_sizes: urls.map(url => ({ url, height, width })),
        original_size: { url: urls[0], height, width }
      }
    })
  }
}