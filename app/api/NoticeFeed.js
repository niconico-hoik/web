// @flow
import React from 'react'
import moment from 'moment'
import rehype from 'rehype'
import find from 'unist-util-find'
import { TumblrPosts } from 'lonogara-tool/api'
import { externalHtml } from 'lonogara-tool/toreact'

const account = 'nicohoi-info'
const query = (api_key) => ({ api_key, type: 'text' })
const SUMMARY_LENGTH = 12
const PREFIX_TYPES = ['期限', 'limit']
const EQUAL_TYPES = [' ', '=']
const SPLIT_TYPES = ['/', '-']

export default async ({ api_key, proxy, setInform }) => {

  const supply = await TumblrPosts(account, { query: query(api_key), proxy })

  const feed = async (reactState = {}) => {
    const posts = reactState.posts || []
    const { done, res } = await supply()
    res.response.posts.forEach(post => posts.push(postTransform(post)))
    await setInform(posts.filter(({ isNew }) => isNew).length)
    return { done, posts }
  }

  return feed
}

const createSummary = string => {
  string = string.split(' ')[0]
  return (string.length <= SUMMARY_LENGTH) ? string : `${string.slice(0, SUMMARY_LENGTH)}...`
}

const whatSeason = month =>
  month <= 2 || month === 12 ? 'winter'
  : month <= 5 ? 'spring'
  : month <= 8 ? 'summer'
  : 'fall'

const postTransform = ({
  body,
  title,
  summary,
  slug,
  timestamp
}) => {
  const postMoment = moment.unix(timestamp)
  const { html, limitString } = separateBodyByRehype(body)
  const limitMoment = limitString
    ? moment(formatForISO(limitString))
    : postMoment.add(10, 'days')

  return {
    summary: createSummary(title || summary || slug),
    isNew: limitMoment.isAfter(moment()),
    season: whatSeason(+postMoment.format('M')),
    date: postMoment.format('Y/M/D'),
    detail: {
      body: externalHtml(`${title ? `<h1>${title}</h1>` : ``}${html}`)
    }
  }
}

const separateBodyByRehype = body => {
  const result = {}
  result.html = rehype()
                .data('settings', { fragment: true, position: false })
                .use(rehypePluginForLimit, (limitString) => { result.limitString = limitString })
                .processSync(body)
                .contents
  return result
}

const rehypePluginForLimit = (cb) =>
  ast => {

    const limitedText = find(ast, ({ type, value }) =>
      type === 'text' &&
      value &&
      PREFIX_TYPES.some((prefix) =>
        EQUAL_TYPES.some((equal) =>
          value.includes(`${prefix}${equal}`)
        )
      )
    )

    if (limitedText) {
      cb(limitedText.value)
      limitedText.value = ''
    }

    return
  }

const formatForISO = limitString =>
  toStringISO(
    toStringAfterEqual(
      limitString.trim()
    )
  )

const toStringAfterEqual = limitString => {

  EQUAL_TYPES.forEach(equalType => {
    limitString = limitString.includes(equalType)
      ? limitString.split(equalType)[1]
      : limitString
  })

  return limitString
}

const toStringISO = limitString => {

  const ymd = []

  SPLIT_TYPES.forEach(splitType =>
    limitString.includes(splitType) &&
    limitString.split(splitType).forEach((fragment) => ymd.push(formatISO(fragment)))
  )

  return ymd.join('-')
}

const formatISO = str => str.length >= 2 ? str : `0${str}`

