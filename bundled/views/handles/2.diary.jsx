import React from 'react'
import Orph from 'orph'
import moment from 'moment'
import { Camera as Button } from 'lonogara-sdk/button'
import { TumblrPosts } from 'lonogara-sdk/api'
import postTransform from './transform'
import { env, HO_UPDATE } from './util.js'
import { Domestic, ExhibitLure } from './Wrap.jsx'

export default ({ Exhibit, Detail }) => ({
  head: 'ほいくダイヤリー',
  Button,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const feed = await createFeed()
    const { posts, done } = await feed({})
    const store = new Orph({ posts, done })
    store.register({
      UPDATE: HO_UPDATE(feed)
    },{
      use: {
        render: true,
        state: true
      }
    })

    return {
      Exhibit: () =>
        <Domestic>
          <ExhibitLure {...{
            store,
            Children: Exhibit,
            actions: {
              renderDetail,
              update: () => store.dispatch('UPDATE')
            }
          }} />
        </Domestic>,

      Detail: ({ data }) =>
        <Domestic>
          <Detail {...{
            type: data.type,
            detail: data.detail,
            actions: { setPopdown }
          }} />
        </Domestic>
    }
  }
})

const createFeed = async () => {
  // const account = 'cinnamonbirbs' // for local test
  const account = 'nicohoi'
  const { api_key, proxy } = env()
  const supply = await TumblrPosts(account, { query: { api_key }, proxy })
  const validations = [
    ({ type }) => type === 'photo',
    ({ type, video_type }) => type === 'video' && video_type === 'tumblr'
  ]

  return async (posts) => {
    posts = Object.assign({}, posts)
    const { done, res } = await supply()

    res.response.posts
    .filter((post) => validations.some((valid) => valid(post)))
    .forEach((post) => {
      const ym = moment.unix(post.timestamp).format('Y / M')
      posts[ym] = Array.isArray(posts[ym]) ? [].concat(posts[ym]) : []
      posts[ym].push(postTransform(post))
    })

    return { posts, done }
  }
}