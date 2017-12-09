// @flow
import React from 'react'
import moment from 'moment'
import { Camera as Button } from 'ligure-tool/button'
import { tumblr } from 'ligure-tool/api'
import Exhibit from './Exhibit.jsx'
import Detail from './Detail.jsx'

// class Button extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//     return <div />
//   }
// }

const head = 'Photo'

const apiOpts = {
  account: 'nicohoi',
  // account: "kthjm",
  api_key: 'DKLtEG9dqbcYUnCSz0eKDtbPTjLUJ1m84uG47mNxbLoKtItW5u',
  query: { type: 'photo' }
}

const create = async ({ renderDetail, setPopdown, setInform }) => {
  const supply = await tumblr.Posts(apiOpts)
  const feed = createFeed(supply)
  const store = await feed()
  console.log(store.posts)

  await setInform(1)

  return {
    inform: 0,
    Exhibit: () => (
      <Exhibit
        {...{
          feed,
          renderDetail,
          setInform,
          give: () => store,
          back: state => {
            store.posts = state.posts
            store.done = state.done
          }
        }}
      />
    ),
    Detail: props => {
      const { ym, index } = props.data
      const { photos, photoset_layout } = store.posts[ym][index]
      console.log(photos)

      const urls = photos.map(({ original_size }) => ({
        src: original_size.url,
        vertically: original_size.height > original_size.width
      }))
      // const urls = photos.map(({ original_size }) => original_size.url)

      const layout = photoset_layout
        ? photoset_layout.split('').map(str => +str)
        : [1]

      const layoutPhotos = layout.map(num => {
        const arr = []
        for (let i = 0; i < num; i++) {
          arr.push(urls.shift())
        }
        return arr
      })

      return <Detail {...{ setPopdown, layoutPhotos }} />
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

const transform = post => {
  return post
}
// const transform = ({
//
// }) => ({
//
// })

export default { head, Button, create }
