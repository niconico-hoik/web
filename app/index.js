import React from 'react'
import { render } from 'react-dom'
import { Mobile, Desktop } from 'ligure'
import mobile from './mobile'
import desktop from './desktop'
import indexCss from './index.css'

document.addEventListener('DOMContentLoaded', () => rendering())

function rendering() {
  const { Ligure, props } = navigator.userAgent.toLowerCase().includes('mobile')
    ? { Ligure: Mobile, props: mobile }
    : { Ligure: Desktop, props: desktop }

  render(
    <div>
      <style>{indexCss.toString()}</style>
      <style>{`a { color: #a5a5a5; text-decoration: none; }`}</style>
      <Ligure {...props} />
    </div>,
    document.getElementById('app')
  )
}
