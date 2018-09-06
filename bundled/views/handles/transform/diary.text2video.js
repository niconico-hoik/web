import { parseFromString } from '../util.js'
import { body2caption, extractTitle } from './util.js'

export default ({ summary, body }) => {

  const { body: bodyDOM } = parseFromString(body)

  return {
    type: 'video',
    summary: extractTitle(bodyDOM) || summary,
    caption: body2caption(bodyDOM),
    thumbnail_url: (bodyDOM.querySelector('video') || {}).poster,
    video_url: (bodyDOM.querySelector('source') || {}).src
  }
}