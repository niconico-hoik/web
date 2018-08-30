import React from 'react'
import Redam from 'redam'
import moment from 'moment'
import { Camera as Button } from 'lonogara-sdk/button'
import { generatePosts } from 'tumblrinbrowser'
import diaryPhoto from './transform/diary.photo.js'
import diaryVideo from './transform/diary.video.js'
import text2video from './transform/diary.text2video.js'
import { env, HO_UPDATE, Domestic } from './util.js'

const postTransform = (post) =>
  post.type === 'photo' ? diaryPhoto(post)
  :
  post.type === 'video' ? diaryVideo(post)
  :
  post.type === 'text' ?
    post.body.includes('<video') ? diaryVideo(text2video(post))
    :
    false
  :
  false

const HighOrderFeed = async () => {
  // const name = 'cinnamonbirbs' // for local test
  const name = 'nicohoi'
  const { api_key, proxy } = env()
  const supply = await generatePosts({ api_key, proxy, name })
  const validations = [
    ({ type }) => type === 'photo',
    ({ type, video_type }) => type === 'video' && video_type === 'tumblr',
    ({ type }) => type === 'text'
  ]

  return async (posts) => {

    posts = Object.assign({}, posts)

    const { done, value: supplied_posts } = await supply()

    supplied_posts
    .filter(post => validations.some((valid) => valid(post)))
    .map(post => ({ timestamp: post.timestamp, post: postTransform(post) }))
    .filter(({ post }) => post)
    .forEach(({ timestamp, post }) => {
      const ym = moment.unix(timestamp).format('Y / M')
      posts[ym] = Array.isArray(posts[ym]) ? [].concat(posts[ym]) : []
      posts[ym].push(post)
    })

    return { posts, done }
  }
}

const HighOrderExhibit = async ({ Exhibit, renderDetail }) => {

  const feed = await HighOrderFeed()
  const { posts, done } = await feed({})

  const initialState = (initialProps, prevState) => prevState || { posts, done }

  const actions = { UPDATE: HO_UPDATE(feed) }

  const Consumer = ({ provided: { dispatch, state: { posts, done } } }) =>
  <Exhibit {...{ posts, done }} actions={{
    renderDetail,
    update: () => dispatch('UPDATE')
  }} />

  const Redamed = Redam(initialState, actions, Consumer, { singleton: true })
  return () => <Domestic><Redamed /></Domestic>
}

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