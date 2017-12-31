// @flow
import React from 'react'
import moment from 'moment'
import rehype from 'rehype'
import find from 'unist-util-find'
import { tumblr } from 'lonogara-tool/api'
import { externalHtml } from 'lonogara-tool/toreact'

const account = 'nicohoi-info'
const query = { type: 'text' }

export default async ({ api_key, setInform }) => {
  const supply = await tumblr.Posts({ api_key, account, query })

  return async (reactState = {}) => {
    const { done, res } = await supply()
    const posts = reactState.posts || []

    res.response.posts.forEach(post => posts.push(postTransform(post)))
    await setInform(posts.filter(({ isNew }) => isNew).length)

    return { done, posts }
  }
}

const postTransform = ({
  body,
  title,
  summary,
  slug,
  timestamp
}) => {
  const postMoment = moment.unix(timestamp)
  const { html, limitString } = processLimit(body)
  const limitMoment = limitString
    ? moment(formatLimitString(limitString))
    : postMoment.add(10, 'days')

  return {
    summary: createSummary(title || summary || slug),
    isNew: limitMoment.isAfter(moment()),
    season: whatSeason(+postMoment.format('M')),
    date: postMoment.format('Y/M/D'),
    detail: {
      body: externalHtml(`${title ? `<h2>${title}</h2>` : ``}${html}`, components)
    }
  }
}

const components = { h1: (props) => <h2 {...props} /> }

const summaryLength = 12

const createSummary = string => {
  string = string.split(' ')[0]
  return string.length <= summaryLength
    ? string
    : `${string.slice(0, summaryLength)}...`
}

const whatSeason = month =>
  month <= 2 || month === 12 ? 'winter'
  : month <= 5 ? 'spring'
  : month <= 8 ? 'summer'
  : 'fall'

const limitPrefixes = ['期限', 'limit']
const rehypeLimit = (cb) => ast => {
  const limitElement = find(
    ast,
    ({ type, value }) =>
      type === 'text' &&
      value &&
      (limitPrefixes.filter(limitPrefix => value.includes(`${limitPrefix}=`)).length ||
      limitPrefixes.filter(limitPrefix => value.includes(`${limitPrefix} `)).length)
  )

  if (limitElement) {
    cb(limitElement.value)
    limitElement.value = ''
  }

  return
}

const formatLimitString = limitString => {
  limitString = limitString.trim()
  limitString = toAfterEqual(limitString)
  limitString = toComplete(limitString)
  return limitString
}

const equalTypes = [' ', '=']

const toAfterEqual = limitString => {

  equalTypes.forEach(equalType => {
    limitString = limitString.includes(equalType)
      ? limitString.split(equalType)[1]
      : limitString
  })

  return limitString
}

const splitTypes = ['/', '-']
const formatISO = str => (str.length >= 2 ? str : `0${str}`)
const toComplete = limitString => {
  let splits
  splitTypes.forEach(splitType => {
    splits = limitString.includes(splitType)
      ? limitString.split(splitType)
      : splits
  })

  return splits.map(formatISO).join('-')
}

const processLimit = html => {
  const result = {}

  const processor = rehype()
    .data('settings', { fragment: true, position: false })
    .use(rehypeLimit, (value) => {
      result.limitString = value
    })

  result.html = processor.processSync(html).contents

  return result
}