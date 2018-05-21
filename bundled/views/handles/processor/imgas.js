import { resolve } from 'url'
import { nodes2array } from '../util.js'

const QUERY = 'img[alt^="as"]'

export default (body, reference) =>
  Promise.all(
    nodes2array(body.querySelectorAll(QUERY))
    .map(img => {
      const { attr, fetchType } = parseAlt(img.alt)
      img.alt = ''

      return (
        fetchType === 'bloburl' ?
        fetch(resolve(reference, img.src))
        .then(res => res.blob())
        .then(blob => img.src = URL.createObjectURL(blob)) :

        fetchType === 'hast' ?
        fetch(resolve(reference, img.src))
        .then(res => res.text())
        .then(text => img.src = svg2dataurl(text)) :

        false
      )
    })
  )

const parseAlt = (alt) => {
  const result = { attr: {}, fetchType: undefined }

  alt
  .split('?')[1]
  .split('&')
  .map(string => string.split('='))
  .forEach(([key,value]) =>
    key === 'fetch'
    ? result.fetchType = value
    : result.attr[key] = value
  )

  return result
}

// https://github.com/likr/svg-dataurl/blob/6401612ec3a111eff53516752eb1ba7aa204230c/index.js#L3-L5
const svg2dataurl = (svgText) =>
  'data:image/svg+xml;charset=utf-8;base64,' +
  btoa(
    encodeURIComponent(svgText)
    .replace(
      /%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode('0x' + p1)
    )
  )