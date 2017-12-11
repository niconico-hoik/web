// @flow
import React from 'react'
import Atra from 'atra'

export default ({ size, onClick, src, summary }) => {
  const imgSize = size * 0.9
  return (
    <div {...a('ROOT', { style: { width: size, height: size * 1.17 } })}>
      <img {...a('IMG', {
        src,
        style: {
          width: imgSize,
          height: imgSize,
          margin: imgSize * 0.05
        }
      })} />
      <span {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>
        {summary}
      </span>
      <div {...a("COVER", { onClick })}></div>
    </div>
  )
}


const a = Atra({
  ROOT: {
    style: {
      display: 'inline-block',
      position: 'relative',
      margin: '5%',
      backgroundColor: '#ffffff',
      textAlign: 'center'
    }
  },

  IMG: {
    style: {
      display: 'inline-block',
      objectFit: 'cover'
    }
  },

  SUMMARY: {
    style: {
      fontSize: '1.6em',
    }
  },

  COVER: {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  }
})