import React, { Component } from 'react'

export class Domestic extends Component {
  render() { return this.props.children }
  shouldComponentUpdate() { return false }
}

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.props.store.attach(this, { inherit: true })
  }
  componentWillUnmount() {
    this.props.store.detach()
  }
  render() {
    const Children = this.props.children.type
    return <Children
      {...this.props.children.props}
      {...this.state}
    />
  }
}