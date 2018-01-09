import React from 'react'
import { Desktop as Lonogara } from 'lonogara'
import { WaveLoading } from 'lonogara-tool/preloader'
import Props from '../props.js'
import home from './0.home.jsx'
import about from './1.about.jsx'
import photo from './2.photo.jsx'
import notice from './3.notice.jsx'

export default () =>
  <Lonogara {...Props({
    backgroundURL: './image/top.desktop.jpg',
    Preloader: () => <WaveLoading {...{ size: 140 }} />,
    views: [
      home,
      about,
      photo,
      notice
    ],
    termStyle: {
      fontSize: '0.9em',
      color: '#ffffff'
    },
    recruitStyle: {
      fontSize: '0.9em',
      color: '#ffffff'
    },
    colors: {
      base: '#ffffff',
      sub: 'rgb(145, 145, 145)',
      background: 'rgba(0, 0, 0, 0.1)',
      preloader: 'rgb(241, 241, 241)',
      detail: 'rgb(255, 255, 255)',
      detailQuit: 'rgb(215, 215, 215)'
    }
  })} />