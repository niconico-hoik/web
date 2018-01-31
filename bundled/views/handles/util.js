// @flow
import React from 'react'
import Atra from 'atra'
import { numToArr } from '../util.js'

export { numToArr }

const api_key = process.env.TUMBLR_KEY
const proxy = Boolean(process.env.REPOSITORY_URL) && './tumblr'
export const env = () => ({ api_key, proxy })

export const HO_UPDATE = (feed) =>
  (n, { render, state }) =>
    render({ done: 'fetching' }, () =>
      state('posts', true)
      .then((posts) => feed(posts))
      .then(({ posts, done }) => render({ posts, done }))
    )