// @flow
import { externalHtml } from 'lonogara-tool/toreact'

function* numToShiftArr(num, cb){
  let from = 0
  while(from < num){
    from++
    yield cb()
  }
}

export default ({
  summary,
  photos,
  caption,
  photoset_layout
}) => {

  const srcs = photos.map(({ original_size }) => ({
    src: original_size.url,
    vertically: original_size.height > original_size.width
  }))

  const layouts = photoset_layout ? photoset_layout.split('').map(str => +str) : [1]

  return {
    summary: summary && `${summary.slice(0, 7)}...`,
    src: photos[0].alt_sizes[2].url,
    detail: {
      caption: externalHtml(caption),
      layouts: layouts.map(num => [...numToShiftArr(num, () => srcs.shift())])
    }
  }
}
// const arr = []
// for (let i = 0; i < num; i++) {
//   arr.push(srcs.shift())
// }
// return arr
