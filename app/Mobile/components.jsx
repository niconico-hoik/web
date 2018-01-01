// @flow
import React from 'react'
import Atra from 'atra'
import { Listen, Cover } from '../util.js'

export { Cover }

export const Click = ({ listener }) => <Listen {...{ type: 'onClick', listener }} />
export const TouchEnd = ({ listener }) => <Listen {...{ type: 'onTouchEnd', listener }} />

export const ExLayout = (a =>

  ({ children }) =>
    <div {...a('LAYOUT')}>{children}</div>

)(Atra({
  LAYOUT: {
    style: {
      width: '99%',
      margin: 'auto',
      fontSize: '2em'
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
      height: 300,
      borderRadius: 7,
      margin: 6,
      overflow: 'hidden',
      letterSpacing: 5
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
      marginBottom: '10%',
      textAlign: 'center'
    }
  },
  MESSAGE: {
    style: {
      position: 'relative',
      color: 'rgb(28, 28, 28)',
      // color: 'rgb(47, 47, 47)',
      // color: 'rgb(28, 28, 28)',
      fontSize: '1.6em',
      // fontWeight: 'bold',
      letterSpacing: 20,
      padding: '2px 8px',
      borderBottomStyle: 'dashed',
      // borderBottomWidth: 7
      borderBottomWidth: 4
    }
  }
}))