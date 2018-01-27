// @flow
import { externalHtml } from 'lonogara-tool/toreact'
import { numToArr } from '../../util.js'

export default ({
  type,
  summary,
  photos,
  caption,
  photoset_layout
}) => ({
  type,
  summary: summary && `${summary.slice(0, 7)}`,
  src: photos[0].alt_sizes[2].url,
  detail: {
    caption: caption && externalHtml(caption),
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