// @flow
import React from 'react'
import Atra from 'atra'
import YearMonth from './YearMonth.jsx'
import Polaroid from './Polaroid.jsx'

type Props = {
  feed(): any,
  renderDetail(): any,
  give(): any,
  back(): any
}

type State = {
  posts: Array<*>,
  done: boolean
}

const More = ({ onClick }) =>
  <div {...{
    onClick,
    style: {
      textAlign: 'center',
      margin: 120,
      fontSize: 30
    }
  }}>
    {'update'}
  </div>

export default class Exhibit extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.give()
    this.update = async () => {
      const { done, posts } = await this.props.feed(this.state.posts)
      this.setState({ done, posts })
    }
  }

  render() {
    return <div>
      {this.createYearMonth()}
      {!this.state.done && <More {...{ onClick: this.update }} />}
    </div>
  }

  createYearMonth(){
    const { posts } = this.state
    return Object.keys(posts).map((ym, index) =>
      <YearMonth key={index} {...{ ym }}>
        {this.createPolaroid({ ym, posts: posts[ym] })}
      </YearMonth>
    )
  }

  createPolaroid({ ym, posts }){
    return posts.map(({ src, summary }, index) =>
      <Polaroid {...{
        key: index,
        src,
        summary,
        size: innerWidth * 0.4,
        onClick: () => this.props.renderDetail({ ym, index })
      }} />
    )
  }

  componentWillUnmount() {
    this.props.back(this.state)
  }
}

const a = Atra({})
