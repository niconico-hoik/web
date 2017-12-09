// @flow
import React from 'react'
import moment from 'moment'
import rehype from 'rehype'
import find from 'unist-util-find'
import { Post as Button } from 'ligure-tool/button'
import { tumblr } from 'ligure-tool/api'
import { externalHtml } from 'ligure-tool/toreact'
import Exhibit from './Exhibit.jsx'
import Detail from './Detail.jsx'
import { api_key, createGiveAndBack } from '../../util.js'

const head = 'Notice'

const apiopts = {
  api_key,
  account: 'toukubo',
  // account: 'nicohoi-info',
  account: 'kthjm',
  // account: 'ononokichan',
  query: { type: 'text' }
}

const create = async ({ renderDetail, setPopdown, setInform }) => {

  const seasons = {
    spring: await fetchToBloburl('./svg/letter.spring.svg'),
    summer: await fetchToBloburl('./svg/letter.summer.svg'),
    fall: await fetchToBloburl('./svg/letter.fall.svg'),
    winter: await fetchToBloburl('./svg/letter.winter.svg')
  };

  const supply = await tumblr.Posts(apiopts)
  // const supply = await tumblr.PostsRandom(apiopts)
  const feed = createFeed({ supply, setInform })
  const store = await feed()
  const { give, back } = createGiveAndBack(store)

  return {
    Exhibit: () =>
      <Exhibit {...{
        feed,
        renderDetail,
        setInform,
        give,
        back,
        seasons
      }} />,
    Detail: props => {
      const postIndex = props.data
      const { body } = store.posts[postIndex].detail
      return <Detail {...{ setPopdown, body }} />
    }
  }
}

const createFeed = ({ supply, setInform }) => async (posts = []) => {
  const { done, res } = await supply()
  res.response.posts.forEach((post) => posts.push(transform(post)))

  const inform = posts.filter(({ isNew }) => isNew).length
  console.log(inform);
  await setInform(inform)

  return { done, posts }
}

const transform = ({
  body,
  title,
  summary,
  slug,
  timestamp
}) => {
  const result = {
    summary: undefined,
    isNew: false,
    season: undefined,
    detail: {
      body: undefined
    }
  }

  result.summary = createSummary(title || summary || slug)

  const postMoment = moment.unix(timestamp)
  const { html, limitString } = processLimit(body)
  const limitMoment = limitString
    ? moment(formatLimitString(limitString))
    : postMoment.add(10, 'days')

  result.isNew = limitMoment.isAfter(moment())
  result.season = whatSeason(+postMoment.format("M"))
  result.date = postMoment.format('Y/M/D')
  result.detail.body = externalHtml(html)

  return result
}

const summaryLength = 12

const createSummary = (string) =>
  string.length < summaryLength
  ? string
  : `${string.slice(0, summaryLength)}...`

const whatSeason = (month) =>
  month <= 2 || month === 12 ? 'winter'
  : month <= 5 ? 'spring'
  : month <= 8 ? 'summer'
  : 'fall'

const limitPrefixes = ['期限', 'limit']
const rehypeLimit = (singleton) => (ast) => {

  const limitElement = find(ast, ({ type, value }) =>
    type === 'text' &&
    value &&
    limitPrefixes.filter((limitPrefix) => value.includes(`${limitPrefix}=`)).length
  )

  if(limitElement) {
    singleton.limitString = limitElement.value
    limitElement.value = ''
  }

  return
}

const formatLimitString = (limitString) => {
  limitString = limitString.trim()
  limitString = toAfterEqual(limitString)
  limitString = toComplete(limitString)
  return limitString
}

const equalTypes = [' ', '=']
const toAfterEqual = (limitString) => {
  equalTypes.forEach((equalType) => {
    limitString = limitString.includes(equalType)
      ? limitString.split(equalType)[1]
      : limitString
  })

  return limitString
}

const splitTypes = ['/', '-']
const formatISO = (str) => str.length >= 2 ? str : `0${str}`
const toComplete = (limitString) => {
  let splits
  splitTypes.forEach((splitType) => {
    splits = limitString.includes(splitType)
     ? limitString.split(splitType)
     : splits
  })

  return splits.map(formatISO).join('-')
}

const processLimit = (html) => {
  const result = {
    html: undefined,
    limitString: undefined
  }

  result.html = rehype()
    .data('settings', { fragment: true, position: false })
    .use(rehypeLimit, result)
    .processSync(html)
    .contents

  return result
}

const fetchToBloburl = src =>
  fetch(src)
    .then(res => res.blob())
    .then(blob => window.URL.createObjectURL(blob))

export default { head, Button, create }