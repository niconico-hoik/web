import React from 'react'
import { Mobile as Lonogara } from 'lonogara'
import { WaveLoading } from 'lonogara-tool/preloader'
import Props from '../props.js'
import home from './0.home.jsx'
import about from './1.about.jsx'
import photo from './2.photo.jsx'
import notice from './3.notice.jsx'

const preloader = <WaveLoading {...{ size: 200 }} />

const props = Props({
  backgroundURL: './image/top.mobile.jpg',
  Preloader: () => preloader,
  views: [home, about, photo, notice],
  colors: {
    base: 'rgb(24, 24, 35)',
    sub: 'rgb(255, 255, 255)',
    background: 'rgba(242, 242, 242, 0.78)',
    preloader: 'rgb(241, 241, 241)',
    detail: 'rgb(243, 243, 243)',
    // detailQuit: 'rgb(24, 24, 35)',
    detailQuit: 'rgb(201, 201, 201)',
    side: 'rgb(183, 220, 197)'
  }
})

props.sides.unshift({
  "href": "https://goo.gl/maps/cZwNJkGV2FB2",
  "buttonImage": "./image/map.png"
})

props.sides.unshift({
  href: 'tel:0725563396',
  buttonImage: './image/tel.png'
})

export default () => <Lonogara {...props} />