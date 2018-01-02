// @flow
import React, { Component } from 'react'
import { House, Question, Camera, Post } from 'lonogara-tool/button'
import { internalHtml } from 'lonogara-tool/toreact'
import NoticeFeed from './NoticeFeed.js'
import PhotoFeed from './PhotoFeed.js'

const api_key = process.env.TUMBLR_KEY

export const Home = (creator) => ({
  // head: 'アクセス',
  Button: House,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const preview = await fetchToReact('./post/about.html')

    const { Exhibit, Detail } = creator({ preview, renderDetail, setPopdown, setInform })

    return {
      Exhibit,
      Detail
    }
  }
})

export const About = (creator) => ({
  head: 'ご利用について',
  Button: Question,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const details = {
      month: await fetchToReact('./post/month.html'),
      infant: await fetchToReact('./post/day.infant.html'),
      school: await fetchToReact('./post/day.school.html')
    }

    const { Exhibit, Detail } = creator({ details, renderDetail, setPopdown, setInform })

    return {
      Exhibit,
      Detail
    }
  }
})

export const Photo = (creator) => ({
  head: 'ほいくダイヤリー',
  Button: Camera,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const feed = await PhotoFeed({ api_key })
    const store = await feed()
    const gack = new Gack(store)
    const { Exhibit, Detail } = creator({ store, renderDetail, setPopdown, setInform })

    return {
      Exhibit: () => <Lure {...{ gack, feed }}>{Exhibit}</Lure>,
      Detail: (props) => <Detail {...props} />
    }
  }
})

export const Notice = (creator) => ({
  head: 'お知らせポスト',
  Button: Post,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const feed = await NoticeFeed({ api_key, setInform })
    const store = await feed()
    const gack = new Gack(store)
    const { Exhibit, Detail } = creator({ store, renderDetail, setPopdown, setInform })

    return {
      Exhibit: () => <Lure {...{ feed, gack }}>{Exhibit}</Lure>,
      Detail: (props) => <Detail {...props} />
    }
  }
})

class Lure extends Component {
  constructor(props) {
    super(props)
    this.state = props.gack.give()

    this.update = async () => {
      this.setState({ done: 'fetching' })
      const { feed } = props
      const nextState = await feed(this.cloneState())
      this.setState(nextState)
    }

    this.transform = async (cb) => {
      const nextState = await cb(this.cloneState())
      this.setState(nextState)
    }

  }

  cloneState() {
    return Object.assign({}, this.state)
  }

  render() {
    const { state, update, transform } = this
    const Children = this.props.children
    return typeof Children === 'function' && <Children {...{ state, update, transform }} />
  }

  componentWillUnmount() {
    this.props.gack.back(this.state)
  }
}

class Gack {
  constructor(store) {
    this.store = store
  }
  give() {
    return Object.assign({}, this.store)
  }
  back(reactState) {
    Object.keys(this.store).forEach(key => {
      this.store[key] = reactState[key]
    })
  }
}

const fetchToReact = src =>
  fetch(src)
  .then(res => res.text())
  .then(html => internalHtml(html, {
    imgas: {
      reference: src
    }
  }))