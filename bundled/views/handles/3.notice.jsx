import React from 'react'
import Redam from 'redam'
import { Post as Button } from 'lonogara-sdk/button'
import { generatePosts } from 'tumblrinbrowser'
import postTransform from './transform/notice.text.js'
import { env, HO_UPDATE, Domestic } from './util.js'
import { Spring, Summer, Fall, Winter } from '../Icons.jsx'

const seasons = {
  spring: <Spring />,
  summer: <Summer />,
  fall: <Fall />,
  winter: <Winter />
}

const HighOrderFeed = async (setInform) => {
  const name = 'nicohoi-info'
  const { api_key, proxy } = env()
  const supply = await generatePosts({ api_key, proxy, name })
  const validations = [
    ({ type }) => type === 'text'
  ]

  return async (posts) => {

    posts = [].concat(posts)

    const { done, value: supplied_posts } = await supply()

    supplied_posts
    .filter(post => validations.some((valid) => valid(post)))
    .forEach(post => posts.push(postTransform(post)))

    await setInform(posts.filter(({ isNew }) => isNew).length)

    return { done, posts }
  }
}

const HighOrderExhibit = async ({ Exhibit, renderDetail, setInform }) => {

  const feed = await HighOrderFeed(setInform)
  const { posts, done } = await feed([])

  const initialState = (initialProps, prevState) => prevState || { posts, done }

  const actions = {
    UPDATE: HO_UPDATE(feed),
    RENDER_DETAIL_THEN: ({ payload: { detail, isNew, index }, state, setState }) =>
      renderDetail({ detail }).then(() =>
        isNew &&
        state('posts').then(Array.from).then(posts => {
          posts[index].isNew = false
          setInform(posts.filter(({ isNew }) => isNew).length).then(() => setState({ posts }))
        })
      )
  }

  const Consumer = ({ provided: { dispatch, state: { posts, done }} }) =>
  <Exhibit {...{ posts, done, seasons }} actions={{
    renderDetailThen: (data) => dispatch('RENDER_DETAIL_THEN', data),
    update: () => dispatch('UPDATE')
  }} />

  const Redamed = Redam(initialState, actions, Consumer, { singleton: true })
  return () => <Domestic><Redamed /></Domestic>
}

export default ({ Exhibit, Detail }) => ({

  head: 'お知らせポスト',

  Button,

  create: async ({ renderDetail, setInform, setPopdown }) => ({

    Exhibit: await HighOrderExhibit({ Exhibit, renderDetail, setInform }),

    Detail: ({ data }) =>
    <Domestic>
      <Detail {...{ body: data.detail.body }} />
    </Domestic>

  })
})