// @flow
import React, { Component } from 'react'
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
({ setState, state }) =>
setState({ done: 'fetching' }, () =>
  state('posts')
  .then(posts => feed(posts))
  .then(({ posts, done }) => setState({ posts, done }))
)

export const f2r = (src) =>
  fetch(src)
  .then(res => res.text())
  .then(html => processAsync(html, src))
  .then(html => h2r(html))

export class Domestic extends Component {
  render() { return this.props.children }
  shouldComponentUpdate() { return false }
}