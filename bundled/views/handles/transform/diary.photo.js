// @flow
import h2r from 'react-html-parser'
import { processSync } from '../processor'
import { numToArr } from '../util.js'

export default ({
  type,
  slug,
  photos,
  caption,
  photoset_layout
}) => ({
  type,
  summary: slug && `${slug.split('-')[0].slice(0, 7)}`,
  src: photos[0].alt_sizes[2].url,
  detail: {
    caption: caption && h2r(processSync(caption)),
    layouts: createLayouts(photos, photoset_layout)
  }
})

const createLayouts = (photos, photoset_layout) => {

  const srcs = photos.map(({ original_size }) => ({
    src: original_size.url,
    vertically: original_size.height > original_size.width
  }))

  const layoutNums = photoset_layout
    ? photoset_layout.split('').map(str => +str)
    : [1]

  return layoutNums.map(num => numToArr(num).map(() => srcs.shift()))
}