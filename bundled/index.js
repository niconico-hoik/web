import React, { Fragment } from 'react'
import { render } from 'react-dom'
import Mobile from './Mobile'
import Desktop from './Desktop'
import indexCss from './index.css'

window.addEventListener('load', () => {
  const App = navigator.userAgent.toLowerCase().includes('mobile') ? Mobile : Desktop
  render(<Layout><App /></Layout>,document.getElementById('app'))
})

const Layout = ({ children }) =>
  <Fragment>
    <style>{indexCss.toString()}</style>
    <style>{`
      a { color: #a5a5a5; text-decoration: none; }
      figure { margin: 0px; }
      blockquote { margin-left: 20px; }
    `}</style>
    {children}
  </Fragment>