// @flow
import React from 'react'
import Atra from 'atra'

export default ({ contents }) => <div {...a('ROOT')}>{contents}</div>

const a = Atra({
  ROOT: {
    className: 'markdown-body',
    style: {
      margin: '0px 20px',
      fontSize: '3em'
    }
  }
})
