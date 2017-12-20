// @flow
import React from 'react'
import { Post as Button } from 'lonogara-tool/button'
import { tumblr } from 'lonogara-tool/api'
import Exhibit from './Exhibit.jsx'
import Detail from './Detail.jsx'
import transform from './transform.js'
import { api_key, createGiveAndBack } from '../../util.js'

const head = 'Notice'

const apiopts = {
  api_key,
  account: 'toukubo',
  account: 'nicohoi-info',
  // account: 'kthjm',
  // account: 'ononokichan',
  query: { type: 'text' }
}

const fetchToBloburl = src =>
  fetch(src)
    .then(res => res.blob())
    .then(blob => window.URL.createObjectURL(blob))

const create = async ({ renderDetail, setPopdown, setInform }) => {
  const seasons = {
    spring: {
      backgroundColor: 'rgb(164, 202, 129)',
    },
    summer: {
      // backgroundColor: 'rgb(164, 202, 129)',
      backgroundColor: 'rgb(109, 195, 191)',
    },
    fall: {
      // backgroundColor: 'rgb(164, 202, 129)',
      backgroundColor: 'rgb(64, 32, 32)',
    },
    winter: {
      // backgroundColor: 'rgb(164, 202, 129)',
      backgroundColor: 'rgb(28, 79, 44)',
    }
  }

  seasons.spring.coverImage = await fetchToBloburl('./svg/letter.spring.svg')
  seasons.summer.coverImage = await fetchToBloburl('./svg/letter.summer.svg')
  seasons.fall.coverImage = await fetchToBloburl('./svg/letter.fall.svg')
  seasons.winter.coverImage = await fetchToBloburl('./svg/letter.winter.svg')

  const supply = await tumblr.Posts(apiopts)
  const feed = createFeed({ supply, setInform })
  const store = await feed()
  const { give, back } = createGiveAndBack(store)

  return {
    Exhibit: () => (
      <Exhibit {...{
        feed,
        renderDetail,
        setInform,
        give,
        back,
        seasons
      }} />
    ),
    Detail: props => {
      const postIndex = props.data
      const { body } = store.posts[postIndex].detail
      return <Detail {...{ setPopdown, body }} />
    }
  }
}

const createFeed = ({ supply, setInform }) =>
  async (posts = []) => {
    const { done, res } = await supply()
    res.response.posts.forEach(post => posts.push(transform(post)))
    const inform = posts.filter(({ isNew }) => isNew).length
    await setInform(inform)
    return { done, posts }
  }

export default { head, Button, create }
