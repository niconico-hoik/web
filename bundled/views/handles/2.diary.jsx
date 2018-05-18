import React from 'react'
import Orph from 'orph'
import moment from 'moment'
import { Camera as Button } from 'lonogara-sdk/button'
import { generatePosts } from 'tumblrinbrowser'
import postTransform from './transform'
import { env, HO_UPDATE } from './util.js'
import { Domestic, Provider } from './Wrap.jsx'

const HighOrderFeed = async () => {
  // const name = 'cinnamonbirbs' // for local test
  const name = 'nicohoi'
  const { api_key, proxy } = env()
  const supply = await generatePosts({ api_key, proxy, name })
  const validations = [
    ({ type }) => type === 'photo',
    ({ type, video_type }) => type === 'video' && video_type === 'tumblr'
  ]

  return async (posts) => {
    posts = Object.assign({}, posts)
    const { done, value: supplied_posts } = await supply()

    supplied_posts
    .filter((post) => validations.some((valid) => valid(post)))
    .forEach((post) => {
      const ym = moment.unix(post.timestamp).format('Y / M')
      posts[ym] = Array.isArray(posts[ym]) ? [].concat(posts[ym]) : []
      posts[ym].push(postTransform(post))
    })

    return { posts, done }
  }
}

const HighOrderExhibit = ({ Exhibit, renderDetail }) =>
  HighOrderFeed()
  .then(feed =>
    feed({})
    .then(({ posts, done }) => new Orph({ posts, done }))
    .then(store => {

      store.register(
        { UPDATE: HO_UPDATE(feed) },
        { use: { render: true, state: true } }
      )

      return {
        store,
        actions: {
          renderDetail,
          update: () => store.dispatch('UPDATE')
        }
      }
    })
  )
  .then(({ store, actions }) =>
    () =>
    <Domestic>
      <Provider {...{ store }}>
        <Exhibit {...{ actions }} />
      </Provider>
    </Domestic>
  )

export default ({ Exhibit, Detail }) => ({

  head: 'ほいくダイヤリー',

  Button,

  create: async ({ renderDetail, setPopdown, setInform }) => ({

    Exhibit: await HighOrderExhibit({ Exhibit, renderDetail }),

    Detail: ({ data }) =>
    <Domestic>
      <Detail {...{
        type: data.type,
        detail: data.detail,
        actions: { setPopdown }
      }} />
    </Domestic>

  })
})