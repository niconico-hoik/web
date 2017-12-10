// @flow
import React from 'react'
import moment from 'moment'
import { Camera as Button } from 'ligure-tool/button'
import { tumblr } from 'ligure-tool/api'
import Exhibit from './Exhibit.jsx'
import Detail from './Detail.jsx'
import transform from './transform.js'
import { api_key, createGiveAndBack } from '../../util.js'

const head = 'Photo'

const apiopts = {
  api_key,
  account: 'nicohoi',
  // account: 'ononokuyan',
  query: { type: 'photo' }
}

const create = async ({ renderDetail, setPopdown, setInform }) => {
  const supply = await tumblr.Posts(apiopts)
  // const supply = await tumblr.PostsRandom(apiopts)
  const feed = createFeed(supply)
  const store = await feed()
  const { give, back } = createGiveAndBack(store)
  return {
    Exhibit: () => (
      <Exhibit {...{
        feed,
        renderDetail,
        setInform,
        give,
        back
      }} />
    ),
    Detail: props => {
      const { ym, index } = props.data
      const { caption, layouts } = store.posts[ym][index].detail
      return <Detail {...{ setPopdown, caption, layouts }} />
    }
  }
}

const createFeed = supply =>
  async (posts = {}) => {
    const { done, res } = await supply()

    res.response.posts.forEach(post => {
      const ym = moment.unix(post.timestamp).format('Y - M')
      posts[ym] = Array.isArray(posts[ym]) ? posts[ym] : []
      posts[ym].push(transform(post))
    })

    return { done, posts }
  }

export default { head, Button, create }
