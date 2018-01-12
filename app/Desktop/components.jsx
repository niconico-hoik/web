// @flow
import React from 'react'
import Atra from 'atra'
import { Listen, Cover } from '../util.js'

export { Cover }

export const MouseDown = ({ listener }) => <Listen {...{ type: 'onMouseDown', listener }} />

export const ExLayout = (a =>

  ({ children }) =>
    <div {...a('LAYOUT')}>{children}</div>

)(Atra({
  LAYOUT: {
    style: {
      width: '99%',
      margin: 'auto'
    }
  }
}))

export const Block = (a =>

  ({ height, children }) =>
    <div {...a('BLOCK')}>{children}</div>

)(Atra({
  BLOCK: {
    style: {
      position: 'relative',
      height: 180,
      borderRadius: 7,
      margin: 6,
      overflow: 'hidden',
      cursor: 'pointer'
    }
  }
}))

export const More = (a =>

  ({ fetching, children }) =>
    <div {...a('ROOT')}>
      <span {...a('MESSAGE', { style: { visibility: fetching && 'hidden' } })}>
        {'つづく'}
        {children}
      </span>
    </div>

)(Atra({
  ROOT: {
    style: {
      margin: 'auto',
      marginTop: '8%',
      marginBottom: '9%',
      textAlign: 'center'
    }
  },
  MESSAGE: {
    style: {
      position: 'relative',
      fontSize: '1.6em',
      color: '#ffffff',
      letterSpacing: 10,
      padding: '2px 8px',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 3,
      cursor: 'pointer'
    }
  }
}))