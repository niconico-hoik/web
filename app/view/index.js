// @flow
import React, { Component } from 'react'
import { House, Question, Camera, Post } from 'lonogara-tool/button'
import { internalHtml } from 'lonogara-tool/toreact'
import NoticeFeed from './NoticeFeed.js'
import PhotoFeed from './PhotoFeed.js'

const { assign } = Object
const api_key = process.env.TUMBLR_KEY

export const Home = (creator) => ({
  // head: 'アクセス',
  Button: House,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const preview = await fetchToReact('./post/preview.html')

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

    const abouts = {
      month: {
        title: '月極預かり',
        description: '持ち物や料金体系について',
        backgroundColor: 'rgb(175, 196, 72)',
        detail: await fetchToReact('./post/month.html')
      },
      month_simu: {
        title: '月極預かりシミュレーション',
        description: 'ケースに応じた実際の料金を算出頂けます',
        backgroundColor: 'rgb(108, 184, 64)'
      },
      temp: {
        title: '一時預かり',
        description: '幼児/小学生ともに対応',
        backgroundColor: 'rgb(90, 147, 190)',
        detail: await fetchToReact('./post/temp.html')
      },
      temp_simu: {
        title: '一時預かりシミュレーション',
        description: 'ケースに応じた実際の料金を算出頂けます',
        backgroundColor: 'rgb(117, 104, 182)'
      }
    }

    const { Exhibit, Detail } = creator({ abouts, renderDetail, setPopdown, setInform })

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
    return assign({}, this.state)
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
    return assign({}, this.store)
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
    components,
    imgas: {
      reference: src
    }
  }))

const components = {
  tr: (props) => <tr {...recreateTrProps(props)} />
}

const recreateTrProps = (props) => {

  props = assign({}, props)

  props.children = props.children.map(
    (td, index, { length }) =>
      index !== length - 1
      ? recreateTd(td)
      : td
  )

  return props
}

const recreateTd = (td) => {

  td = assign({}, td)
  td.props = assign({}, td.props)
  td.props.style = assign({}, td.props.style)
  td.props.style.whiteSpace = 'nowrap'

  return td
}

  // width: 49.5%;
  // height: 350px;
  // object-fit: cover;
  // img: (props) =>
  //   props.className === 'preview_square'
  //   ? <span></span>
  //   : <img {...props} />