import { resolve } from 'url'
import { nodes2array } from '../util.js'

const QUERY = 'img[alt^="as"]'

export default (body, reference) =>
  Promise.all(
    nodes2array(body.querySelectorAll(QUERY))
    .map(img => {
      const { attr, fetchType } = parseAlt(img.alt)
      img.alt = ''
      
      return fetchType === 'bloburl' &&
      fetch(resolve(reference, img.src))
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(bloburl => img.src = bloburl)
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