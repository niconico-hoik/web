// @flow
import React, { Component } from 'react'

const isNum = (target) => typeof target === 'number'
const raf = (callback) => window.requestAnimationFrame(callback)
const lag = (time) => new Promise(resolve => setTimeout(resolve, time))

function ref(target) {
  if(target){
    this.getWidth = () => target.clientWidth
  }
}

const PARENT_WIDTH = 960 - 6

export default class Widthing extends Component {
  constructor(props) {
    super(props)
    this.state = { width: PARENT_WIDTH }
    this.ref = ref.bind(this)
  }
  render() {
    return <div ref={this.ref}>{isNum(this.state.width) && this.children()}</div>
  }
  children() {
    const Children = this.props.children
    const { width } = this.state
    return <Children {...{ width }} />
  }

  componentDidMount() {
    const width = this.getWidth()
    this.requestSetState(width)
  }

  componentDidUpdate() {
    const width = this.getWidth()
    return width !== this.state.width && this.requestSetState(width, 100)
  }

  requestSetState(width, time=0) {
    lag(time).then(() => raf(() => this.setState({ width })))
  }
}