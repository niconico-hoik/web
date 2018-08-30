import h2r from 'react-html-parser'
import { processSync } from '../processor'
import { parseFromString } from '../util.js'

export default (post) =>
  post.body.includes('<video') ? text2video(post) :
  false

const captionalTagNames = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p'
]

const text2video = ({ summary, body }) => {

  const { body: bodyDOM } = parseFromString(body)

  summary =
  body.includes('<h1') ? bodyDOM.querySelector('h1').innerText :
  body.includes('<h2') ? bodyDOM.querySelector('h2').innerText :
  summary

  const caption =
  Array
  .from(bodyDOM.childNodes)
  .map(({ tagName, innerHTML }) => {
    const tag = tagName.toLowerCase()
    return captionalTagNames.includes(tag) && `<${tag}>${innerHTML}</${tag}>`
  })
  .filter(html => html)
  .join('')

  const { poster: thumbnail_url } = bodyDOM.querySelector('video') || {}
  const { src: video_url } = bodyDOM.querySelector('source') || {}

  return {
    type: 'video',
    summary: summary && `${summary.slice(0, 7)}`,
    src: thumbnail_url,
    detail: {
      caption: caption && h2r(processSync(caption)),
      poster: thumbnail_url,
      video: video_url
    }
  }
}