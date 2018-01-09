// @flow
import React from 'react'
import Atra from 'atra'
import { sum } from './util.js'

export const Space = ({ size }) => <div {...{ style: { height: size } }} />
export const Font = ({ size, children }) => <div {...{ style: { fontSize: size } }}>{children}</div>
export const FontInline = ({ size, children }) => <span {...{ style: { fontSize: size } }}>{children}</span>
export const Vertical = ({ align, children }) => <span {...{ style: { verticalAlign: align } }}>{children}</span>

export const Relative = ({ top, bottom, left, right, children }) =>
  <div {...{
    style: {
      position: 'relative',
      top,
      bottom,
      left,
      right
    }
  }}>
    {children}
  </div>

export const RelativeInline = ({ top, bottom, left, right, children }) =>
  <span {...{
    style: {
      position: 'relative',
      top,
      bottom,
      left,
      right
    }
  }}>
    {children}
  </span>

export const Absolute = ({ top, bottom, left, right, children }) =>
  <div {...{
    style: {
      position: 'absolute',
      top,
      bottom,
      left,
      right
    }
  }}>
    {children}
  </div>

export const AbsoluteInline = ({ top, bottom, left, right, children }) =>
  <span {...{
    style: {
      position: 'absolute',
      top,
      bottom,
      left,
      right
    }
  }}>
    {children}
  </span>

export const Select = (a => {

  const datasetToAttr = (dataset) => {
    const attr = {}
    Object.entries(dataset || {}).forEach(([name,value]) => {
      attr[`data-${name}`] = value
    })
    return attr
  }

  return ({ onChange, value, dataset, color, children }) =>
    <select {...a('SELECT', Object.assign(datasetToAttr(dataset), {
      onChange,
      value,
      style: { color }
    }))}>
      {children}
    </select>

})(Atra({
  SELECT: {
    style: {
      fontSize: 'inherit',
      paddingBottom: 3,
      borderStyle: 'none',
      background: 'rgba(0,0,0,0)'
    }
  }
}))

export const TotalWithoutTax = ({ total }) =>
  <div>
    <FontInline size={'1.2em'}>
      <Vertical align={'middle'}>
        <span>{`合計 ￥${total}`}</span>
      </Vertical>
    </FontInline>
    <span>{' '}</span>
    <FontInline size={'0.6em'}>
      <RelativeInline top={-2}>
        <span>{`(税抜き)`}</span>
      </RelativeInline>
    </FontInline>
  </div>

export const Results = (a =>

  ({ left, children }) =>
    <div {...a('RESULTS', { style: { left } })}>{children}</div>

)(Atra({
  RESULTS: {
    style: {
      display: 'inline-block',
      position: 'relative',
      textAlign: 'left'
    }
  }
}))

export const ResultDetails = ({ left, right, children }) =>
  <Absolute {...{ left, right }}>
    <Font size={'0.6em'}>
      <div {...{ style: { whiteSpace: 'nowrap' } }}>
        {children}
      </div>
    </Font>
  </Absolute>