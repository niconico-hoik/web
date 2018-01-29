import React from 'react'
import { Mobile as Lonogara } from 'lonogara'
import { WaveLoading } from 'lonogara-tool/preloader'
import Props from '../props.js'
import home from './0.home.jsx'
import about from './1.about.jsx'
import photo from './2.diary.jsx'
import notice from './3.notice.jsx'

export default () => {

  const props = Props({
    backgroundURL: './image/top.mobile.jpg',
    Preloader: () => <WaveLoading {...{ size: 200 }} />,
    views: [
      home,
      about,
      photo,
      notice
    ],
    termStyle: {
      position: 'relative',
      top: '-68%',
      color: '#ffffff'
    },
    recruitStyle: {
      position: 'relative',
      top: '-78%',
      color: '#ffffff'
    },
    colors: {
      base: 'rgb(24, 24, 35)',
      sub: 'rgb(255, 255, 255)',
      background: 'rgba(242, 242, 242, 0.78)',
      preloader: 'rgb(241, 241, 241)',
      detail: 'rgb(243, 243, 243)',
      detailQuit: 'rgb(201, 201, 201)',
      links: 'rgb(183, 220, 197)'
    }
  })

  props.links = [
    {
      href: 'tel:0725563396',
      buttonImage: './image/tel.png'
    },
    {
      "href": "https://goo.gl/maps/cZwNJkGV2FB2",
      "buttonImage": "./image/map.png"
    }
  ].concat(props.links)

  return <Lonogara {...props} />
}