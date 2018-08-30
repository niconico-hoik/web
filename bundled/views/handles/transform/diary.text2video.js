import { parseFromString } from '../util.js'

const captionalTagNames = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p'
]

export default ({ summary, body }) => {

  const { body: bodyDOM } = parseFromString(body)

  return {
    type: 'video',
    summary: (
      body.includes('<h1') ? bodyDOM.querySelector('h1').innerText :
      body.includes('<h2') ? bodyDOM.querySelector('h2').innerText :
      summary
    ),
    caption: Array.from(bodyDOM.childNodes).map(({ tagName, innerHTML }) => {
      const tag = tagName.toLowerCase()
      return captionalTagNames.includes(tag) ? `<${tag}>${innerHTML}</${tag}>` : ''
    }).join(''),
    thumbnail_url: (bodyDOM.querySelector('video') || {}).poster,
    video_url: (bodyDOM.querySelector('source') || {}).src
  }
}