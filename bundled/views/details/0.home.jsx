import React from 'react'

export default (isMobile) => {

  const attributes = {
    className: 'markdown-body',
    style: {
      fontSize: isMobile ? '2.6em' : '1.3em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 2,
      margin: isMobile ? '0px 7%' : '0px 10%'
    }
  }

  return ({ preview }) =>
    <div {...attributes}>
      {preview}
    </div>
}