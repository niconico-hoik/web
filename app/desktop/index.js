import React from 'react'
import { Desktop as Lonogara } from 'lonogara'
import { WaveLoading } from 'lonogara-tool/preloader'
import _props from '../props.js'
import about from './about'
import home from './home'
import notice from './notice'
import photo from './photo'

const props = _props({
  backgroundURL: './image/top.desktop.jpg',
  Preloader: () => <WaveLoading {...{ size: 140 }} />,
  views: [home, about, photo, notice],
  colors: {
    base: '#ffffff',
    sub: 'rgb(145, 145, 145)',
    background: 'rgba(0, 0, 0, 0.6)',
    preloader: 'rgb(241, 241, 241)',
    detail: 'rgb(243, 243, 243)',
    detailQuit: 'rgb(66, 62, 89)'
  }
})

export default () => <Lonogara {...props} />