import React from 'react'
import Orph from 'orph'
import { Post as Button } from 'lonogara-sdk/button'
import { TumblrPosts } from 'lonogara-sdk/api'
import postTransform from './transform'
import { env, HO_UPDATE } from './util.js'
import { Domestic, Provider } from './Wrap.jsx'
import { Spring, Summer, Fall, Winter } from '../Icons.jsx'

const HighOrderFeed = async (setInform) => {
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

const HighOrderExhibit = ({ Exhibit, renderDetail, setInform }) =>
  HighOrderFeed(setInform)
  .then(feed =>
    feed([])
    .then(({ posts, done }) => new Orph({ posts, done }))
    .then(store => {

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
        store,
        actions: {
          update: () => store.dispatch('UPDATE'),
          renderDetailThen: (data) => store.dispatch('RENDER_DETAIL_THEN', data)
        },
        seasons: {
          spring: <Spring />,
          summer: <Summer />,
          fall: <Fall />,
          winter: <Winter />
        }
      }
    })
  )
  .then(({ store, actions, seasons }) =>
    () =>
    <Domestic>
      <Provider {...{ store }}>
        <Exhibit {...{ actions, seasons }} />
      </Provider>
    </Domestic>
  )


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