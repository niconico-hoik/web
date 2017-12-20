import React from 'react'
import { render } from 'react-dom'
import Mobile from './mobile'
import Desktop from './desktop'
import indexCss from './index.css'

document.addEventListener('DOMContentLoaded', () => rendering())

function rendering() {
  const Lonogara = navigator.userAgent.toLowerCase().includes('mobile')
    ? Mobile
    : Desktop

  render(
    <div>
      <style>{indexCss.toString()}</style>
      <style>{`a { color: #a5a5a5; text-decoration: none; }`}</style>
      <Lonogara />
    </div>,
    document.getElementById('app')
  )
}
