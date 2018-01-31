import { externalHtml } from 'lonogara-sdk/toreact'

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
    caption: caption && externalHtml(caption),
    poster: thumbnail_url,
    video: video_url
  }
})