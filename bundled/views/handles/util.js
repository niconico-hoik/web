// @flow
import h2r from 'react-html-parser'
import { processAsync } from './processor'
import { numToArr } from '../util.js'
export { numToArr }

const api_key = process.env.TUMBLR_KEY
const proxy = Boolean(process.env.REPOSITORY_URL) && './tumblr'
export const env = () => ({ api_key, proxy })

export const parseFromString = (html) => new DOMParser().parseFromString(html, 'text/html')

export const nodes2array = (nodes) => Array.from(nodes)

export const HO_UPDATE = (feed) =>
  (n, { render, state }) =>
    render({ done: 'fetching' }, () =>
      state('posts', true)
      .then((posts) => feed(posts))
      .then(({ posts, done }) => render({ posts, done }))
    )

export const f2r = (src) =>
  fetch(src)
  .then(res => res.text())
  .then(html => processAsync(html, src))
  .then(html => h2r(html))