// @flow
import React from 'react'
import moment from 'moment'
import { Camera as Button } from 'ligure-tool/button'
import { tumblr } from 'ligure-tool/api'
import { externalHtml } from 'ligure-tool/toreact'
import Exhibit from './Exhibit.jsx'
import Detail from './Detail.jsx'
import { api_key, createGiveAndBack } from '../../util.js'

const head = 'Photo'

const apiopts = {
  api_key,
  account: 'nicohoi',
  query: { type: 'photo' }
}

const create = async ({ renderDetail, setPopdown, setInform }) => {
  const feed = createFeed(await tumblr.Posts(apiopts))
  // const feed = createFeed(await tumblr.PostsRandom(apiopts))
  const store = await feed()
  const { give, back } = createGiveAndBack(store)

  return {
    Exhibit: () => (
      <Exhibit {...{ feed, renderDetail, setInform, give, back }} />
    ),
    Detail: props => {
      const { ym, index } = props.data
      const { caption, layouts } = store.posts[ym][index].detail
      return <Detail {...{ setPopdown, caption, layouts }} />
    }
  }
}

const createFeed = supply => async (posts = {}) => {
  const { done, res } = await supply()
  res.response.posts.forEach(post => {
    const ym = moment.unix(post.timestamp).format('YYYY / M')
    if (!Array.isArray(posts[ym])) {
      posts[ym] = []
    }
    posts[ym].push(transform(post))
  })
  return { done, posts }
}

const transform = ({ summary, photos, caption, photoset_layout }) => {
  const result = {
    summary: undefined,
    photo: undefined,
    detail: {
      caption: undefined,
      layouts: undefined
    }
  }

  result.summary = summary ? `${summary.slice(0, 7)}...` : ''
  result.photo = photos[0].alt_sizes[2].url
  result.detail.caption = externalHtml(caption)

  const willpushed = photos.map(({ original_size }) => ({
    src: original_size.url,
    vertically: original_size.height > original_size.width
  }))

  const layouts = photoset_layout
    ? photoset_layout.split('').map(str => +str)
    : [1]

  result.detail.layouts = layouts.map(num => {
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push(willpushed.shift())
    }
    return arr
  })

  return result
}

export default { head, Button, create }
