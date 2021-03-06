import React, { Fragment } from 'react'

export default (isMobile) => {

  const attributes = {
    className: 'markdown-body',
    style: isMobile ? {
      margin: '0px 4%',
      fontSize: '2.6em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 4
    } : {
      margin: '0px 10%',
      fontSize: '1.3em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 2
    }
  }

  return ({ body }) => <div {...attributes}>{body}</div>
}