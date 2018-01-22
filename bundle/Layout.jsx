import React, { Fragment } from 'react'
import indexCss from './index.css'

export default ({ children }) =>
  <Fragment>
    <style>{indexCss.toString()}</style>
    <style>{`
      a { color: #a5a5a5; text-decoration: none; }
      figure { margin: 0px; }
      blockquote { margin-left: 20px; }
    `}</style>
    {children}
  </Fragment>