import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Mobile, Desktop } from 'react-lonogara'
import { WaveLoading } from 'lonogara-sdk/preloader'
import indexCss from './index.css'
import Views from './views'

const rendering = (isMobile) => {

  const Lonogara = isMobile ? Mobile : Desktop

  render(
    <Fragment>
      <style>{indexCss.toString()}</style>
      <style>{`
        a { color: #4cb78c; }
        figure { margin: 0px; }
        blockquote { margin-left: 20px; }
      `}</style>
      <Lonogara {...props(isMobile)} />
    </Fragment>,
    document.getElementById('app')
  )
}

const props = (isMobile) => ({

  views: Views(isMobile),

  Preloader: isMobile
    ? () => <WaveLoading size={200} />
    : () => <WaveLoading size={140} />,

  background: [
    `./image/top.${isMobile ? 'mobile' : 'desktop'}.jpg`,
    {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  ],

  colors: isMobile ? {
    base: '#122f25',
    sub: 'rgb(255, 255, 255)',
    background: 'rgba(242, 242, 242, 0.78)',
    preloader: 'rgb(241, 241, 241)',
    // detail: 'rgb(243, 243, 243)',
    detail: 'rgb(250, 250, 250)',
    detailQuit: 'rgb(201, 201, 201)',
    links: 'rgb(183, 220, 197)'
  } : {
    base: '#ffffff',
    sub: 'rgb(145, 145, 145)',
    background: 'rgba(0, 0, 0, 0.1)',
    preloader: 'rgb(241, 241, 241)',
    detail: 'rgb(255, 255, 255)',
    detailQuit: 'rgb(215, 215, 215)',
    links: 'rgba(0, 0, 0, 0.88)'
  },

  links: [].concat(
    isMobile
    ? [
      {
        href: 'tel:0725563396',
        buttonImage: './image/tel.png'
      },
      {
        href: 'https://goo.gl/maps/cZwNJkGV2FB2',
        buttonImage: './image/map.png'
      }
    ]
    : [],
    [
      {
        href: 'https://twitter.com/niconico_hoik',
        buttonImage: './image/twitter.png'
      },
      {
        href: 'https://www.facebook.com/nicohoizumi/',
        buttonImage: './image/facebook.png'
      },
      {
        href: 'https://bs.benefit-one.co.jp/bs/pages/bs/srch/menuPrticSrchRslt.faces?menuNo=643630',
        buttonImage: './image/benefit.png'
      },
      {
        href: 'pdf/term.pdf',
        buttonImage: './image/pdf.mobile.png',
        coverColor: 'rgba(0, 15, 19, 0.48)',
        description: [
          '利用規約',
          isMobile
          ? {
            position: 'relative',
            top: '-68%',
            color: '#ffffff'
          } : {
            fontSize: '0.9em',
            color: '#ffffff'
          }
        ]
      },
      {
        href: 'pdf/recruit.pdf',
        buttonImage: './image/pdf.mobile.png',
        coverColor: 'rgba(0, 15, 19, 0.48)',
        description: [
          '保育士募集のご案内',
          isMobile
          ? {
            position: 'relative',
            top: '-78%',
            color: '#ffffff'
          } : {
            fontSize: '0.9em',
            color: '#ffffff'
          }
        ]
      }
    ]
  )
})

rendering(
  navigator
  .userAgent
  .toLowerCase()
  .includes('mobile')
)
