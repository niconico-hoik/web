// @flow
import React from 'react'
import Atra from 'atra'

const AbsoluteMax = (a =>

  (props) => <div {...a('DIV', Object.assign({}, props))} />

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

export const Cover = (props) => <AbsoluteMax {...props} />

export const Listen = ({ listener, type }) => <AbsoluteMax {...{ [type]: listener }} />

export const widthToSome = ({ baseWidth, length, marginRatio }) => {
  const prePercent = 100 / length
  const surplus = prePercent * marginRatio

  const widthPercent = prePercent - surplus
  const marginPercent = surplus / 2

  const width = baseWidth * (widthPercent * 0.01)
  const margin = baseWidth * (marginPercent * 0.01)
  return { width, margin }
}

function* numToArrG(num) {
  let from = 0
  while (from < num) {
    yield
    from++
  }
}

export const numToArr = (num) => [...numToArrG(num)]