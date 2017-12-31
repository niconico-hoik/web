// @flow
import React from 'react'
import Atra from 'atra'
import { Listen, Cover } from '../util.js'

export { Cover }

export const Click = ({ listener }) => <Listen {...{ type: 'onClick', listener }} />

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

export const DeTextLayout = (a =>

  ({ children }) =>
    <div {...a('LAYOUT')}>{children}</div>

)(Atra({
  LAYOUT: {
    style: {
      width: '85%',
      // marginTop: 10,
      marginLeft: '4%',
      color: 'rgb(72, 72, 72)',
      // fontSize: '1.2em',
      fontSize: '2.3em',
      letterSpacing: 3,
      lineHeight: 2,
      overflowX: 'hidden'
    }
  },
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
      overflow: 'hidden'
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
      // color: 'rgb(147, 147, 147)',
      color: 'rgb(28, 28, 28)',
      fontSize: '1.6em',
      fontWeight: 'bold',
      letterSpacing: 20,
      padding: '2px 8px',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 7
    }
  }
}))