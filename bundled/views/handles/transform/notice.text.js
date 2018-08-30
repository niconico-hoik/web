// @flow
import moment from 'moment'
import h2r from 'react-html-parser'
import { processSync } from '../processor'
import { parseFromString, nodes2array } from '../util.js'

const SUMMARY_LENGTH = 12
const PREFIX_TYPES = ['期限', 'limit']
const EQUAL_TYPES = [' ', '=']
const SPLIT_TYPES = ['/', '-']

const separateBody = html => {
  const result = { html: undefined, limitString: undefined }

  const { body } = parseFromString(html)

  const pContainLimit = nodes2array(body.querySelectorAll('p')).find(
    ({ innerText }) =>
      PREFIX_TYPES.some((prefix) =>
        EQUAL_TYPES.some((equal) =>
          innerText.includes(`${prefix}${equal}`)
        )
      )
  )

  if (pContainLimit) {
    result.limitString = pContainLimit.innerText
    pContainLimit.parentNode.removeChild(pContainLimit)
  }

  result.html = processSync(body.innerHTML)

  return result
}

export default ({
  body,
  title,
  summary,
  slug,
  timestamp
}) => {
  const postMoment = moment.unix(timestamp)
  const date = postMoment.format('Y/M/D')
  const { html, limitString } = separateBody(body)

  return {
    date,
    summary: createSummary(title || summary || slug),
    season: monthToSeason(+postMoment.format('M')),
    isNew: (limitString ? moment(formatForISO(limitString)) : postMoment.add(10, 'days')).isAfter(moment()),
    detail: {
      body: h2r(`<h5>${date}</h5>${title ? `<h1>${title}</h1>` : ``}${html}`)
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