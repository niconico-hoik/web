import React from 'react'
import { Post as Button } from 'lonogara-tool/button'
import env from './env.js'
import { TumblrPosts } from 'lonogara-tool/api'
import postTransform from './transform'
import Orph from 'orph'
import { HO_UPDATE } from './actions'
import { Domestic, ExhibitLure } from './components.jsx'
import { Spring, Summer, Fall, Winter } from '../Icons.jsx'

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

export default (hoComponents) => ({
  head: 'お知らせポスト',
  Button,
  create: async ({ renderDetail, setInform, setPopdown }) => {

    const { Exhibit, Detail } = hoComponents()

    const seasons = {
      spring: <Spring />,
      summer: <Summer />,
      fall: <Fall />,
      winter: <Winter />
    }

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