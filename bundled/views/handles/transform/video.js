import h2r from 'react-html-parser'
import { processSync } from '../processor'

export default ({
  type,
  summary,
  thumbnail_url,
  caption,
  video_url
}) => ({
  type,
  summary: summary && `${summary.slice(0, 7)}`,
  src: thumbnail_url,
  detail: {
    caption: caption && h2r(processSync(caption)),
    poster: thumbnail_url,
    video: video_url
  }
})