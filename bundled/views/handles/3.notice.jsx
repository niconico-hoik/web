import React from 'react'
import Orph from 'orph'
import { Post as Button } from 'lonogara-sdk/button'
import { TumblrPosts } from 'lonogara-sdk/api'
import postTransform from './transform'
import { env, HO_UPDATE } from './util.js'
import { Domestic, ExhibitLure } from './Wrap.jsx'
import { Spring, Summer, Fall, Winter } from '../Icons.jsx'

const seasons = {
  spring: <Spring />,
  summer: <Summer />,
  fall: <Fall />,
  winter: <Winter />
}

export default ({ Exhibit, Detail }) => ({
  head: 'お知らせポスト',
  Button,
  create: async ({ renderDetail, setInform, setPopdown }) => {

    const feed = await createFeed(setInform)
    const { posts, done } = await feed([])
    const store = new Orph({ posts, done })
    store.register({
      UPDATE: HO_UPDATE(feed),
      RENDER_DETAIL_THEN: ({ detail, isNew, index }, { state, render }) =>
        renderDetail({ detail }).then(() =>
          isNew &&
          state('posts').then(posts => {
            posts[index].isNew = false
            setInform(posts.filter(({ isNew }) => isNew).length)
            .then(() =>
              render({ posts })
            )
          })
        )
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
            customProps: { seasons },
            actions: {
              update: () => store.dispatch('UPDATE'),
              renderDetailThen: (data) => store.dispatch('RENDER_DETAIL_THEN', data)
            }
          }} />
        </Domestic>,

      Detail: ({ data }) =>
        <Domestic>
          <Detail {...{ body: data.detail.body }} />
        </Domestic>
    }
  }
})

const createFeed = async (setInform) => {
  const account = 'nicohoi-info'
  const { api_key, proxy } = env()
  const supply = await TumblrPosts(account, { query: { api_key, type: 'text' }, proxy })

  return async (posts) => {
    posts = [].concat(posts)
    const { done, res } = await supply()

    res.response.posts.forEach(post => posts.push(postTransform(post)))
    await setInform(posts.filter(({ isNew }) => isNew).length)

    return { done, posts }
  }
}