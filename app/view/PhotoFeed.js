// @flow
import moment from 'moment'
import { tumblr } from 'lonogara-tool/api'
import { externalHtml } from 'lonogara-tool/toreact'
import { numToArr } from '../util.js'

const account = 'nicohoi'
const query = { type: 'photo' }

export default async ({ api_key }) => {
  const supply = await tumblr.Posts({ api_key, account, query })

  return async (reactState = {}) => {
    const { done, res } = await supply()
    const posts = reactState.posts || {}

    res.response.posts.forEach(post => {
      // const ym = moment.unix(post.timestamp).format('Y - M')
      const ym = moment.unix(post.timestamp).format('Y / M')
      posts[ym] = Array.isArray(posts[ym]) ? posts[ym] : []
      posts[ym].push(postTransform(post))
    })

    return { done, posts }
  }
}

const postTransform = ({
  summary,
  photos,
  caption,
  photoset_layout
}) => {

  const srcs = photos.map(({ original_size }) => ({
    src: original_size.url,
    vertically: original_size.height > original_size.width
  }))

  const layoutNums = photoset_layout
    ? photoset_layout.split('').map(str => +str)
    : [1]

  return {
    // summary: summary && `${summary.slice(0, 7)}...`,
    summary: summary && `${summary.slice(0, 7)}`,
    src: photos[0].alt_sizes[2].url,
    detail: {
      caption: caption && externalHtml(caption),
      layouts: layoutNums.map(num =>
        numToArr(num).map(() => srcs.shift())
      )
    }
  }
}