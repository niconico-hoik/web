import React from 'react'

export default (isMobile) => {
  
  const attributes = {
    className: 'markdown-body',
    style: {
      fontSize: isMobile ? '2.6em' : '1.3em',
      color: 'rgb(72, 72, 72)',
      letterSpacing: 2,
      margin: '0px 20px'
    }
  }

  return ({ preview }) =>
    <div {...attributes}>
      {preview}
    </div>
}