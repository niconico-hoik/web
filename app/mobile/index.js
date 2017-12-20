import React from 'react'
import { Mobile as Lonogara } from 'lonogara'
import { WaveLoading } from 'lonogara-tool/preloader'
import _props from '../props.js'
import about from './about'
import home from './home'
import notice from './notice'
import photo from './photo'

const props = _props({
  backgroundURL: './image/top.mobile.jpg',
  Preloader: () => <WaveLoading {...{ size: 200 }} />,
  views: [home, about, photo, notice],
  colors: {
    base: 'rgb(24, 24, 35)',
    sub: 'rgb(255, 255, 255)',
    background: 'rgba(242, 242, 242, 0.78)',
    preloader: 'rgb(241, 241, 241)',
    detail: 'rgb(243, 243, 243)',
    detailQuit: 'rgb(24, 24, 35)',
    side: 'rgb(77, 172, 125)'
  }
})

props.sides.unshift({
  href: 'tel:0725563396',
  buttonImage: './image/tel.png'
})

export default () => <Lonogara {...props} />