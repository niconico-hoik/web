// @flow
import moment from 'moment'
import rehype from 'rehype'
import find from 'unist-util-find'
import { externalHtml } from 'lonogara-sdk/toreact'

const SUMMARY_LENGTH = 12
const PREFIX_TYPES = ['期限', 'limit']
const EQUAL_TYPES = [' ', '=']
const SPLIT_TYPES = ['/', '-']

export default ({
  body,
  title,
  summary,
  slug,
  timestamp
}) => {
  const postMoment = moment.unix(timestamp)
  const date = postMoment.format('Y/M/D')
  const { html, limitString } = separateBodyByRehype(body)

  return {
    date,
    summary: createSummary(title || summary || slug),
    season: monthToSeason(+postMoment.format('M')),
    isNew: (limitString ? moment(formatForISO(limitString)) : postMoment.add(10, 'days')).isAfter(moment()),
    detail: {
      body: externalHtml(`<h5>${date}</h5>${title ? `<h1>${title}</h1>` : ``}${html}`)
    }
  }
}

const createSummary = string => {
  string = string.split(' ')[0]
  return (string.length <= SUMMARY_LENGTH) ? string : `${string.slice(0, SUMMARY_LENGTH)}...`
}

const monthToSeason = month =>
  month <= 2 || month === 12 ? 'winter'
  : month <= 5 ? 'spring'
  : month <= 8 ? 'summer'
  : 'fall'

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

    const limitText = find(ast, ({ type, value }) =>
      type === 'text' &&
      value &&
      PREFIX_TYPES.some((prefix) =>
        EQUAL_TYPES.some((equal) =>
          value.includes(`${prefix}${equal}`)
        )
      )
    )

    if (limitText) {
      cb(limitText.value)
      limitText.value = ''
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