import React from 'react'
import Atra from 'atra'

export const Cover = (a =>

  (props) =>
    <div {...a('DIV', Object.assign({}, props))} />

)(Atra({
  DIV: {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  }
}))

const Listen = ({ listener, type }) => <Cover {...{ [type]: listener }} />
export const MouseDown = ({ listener }) => <Listen {...{ type: 'onMouseDown', listener }} />
export const Click = ({ listener }) => <Listen {...{ type: 'onClick', listener }} />