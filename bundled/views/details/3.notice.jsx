import React, { Fragment } from 'react'

export default (isMobile) => {

  const attributes = {
    className: 'markdown-body',
    style: isMobile ? {
      fontSize: '2.6em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 2,
      margin: '0px 20px'
    } : {
      margin: '0px 20px',
      fontSize: '1.3em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 2
    }
  }

  return ({ body }) => <div {...attributes}>{body}</div>
}