import React, { Fragment } from 'react'
import Atra from 'atra'
import Widthing from './Widthing.jsx'
import { MouseDown, Click } from '../Cover.jsx'

const Video = (() => {
  const a = Atra({
    ROOT: {
      style: {
        position: 'relative',
        backgroundColor: '#000',
        width: '98%',
        height: 650,
        margin: 'auto'
      }
    },
    PLAYER: {
      width: '100%',
      height: '100%',
      controls: true
    }
  })

  return ({ poster, video: src }) =>
  <div {...a('ROOT')}>
    <video {...a('PLAYER', { src, poster })} />
  </div>
})()

export default (isMobile) =>
  isMobile
    ? HoMobile()
    : HoDesktop()

const HoMobile = () => {

  const details = {

    photo: ((a) =>

      ({ layouts }, actions) => {

        const parentWidth = window.innerWidth - 5
        const marginSway = 5
        const marginTop = marginSway - 2
        const margin = `${marginTop}px ${marginSway}px 0px`

        return <div {...a('LAYOUTS')}>
          {layouts.map(photos => {
            const width = (parentWidth / photos.length) - (marginSway * 2)

            const height = layouts.length === 1
              ? photos.length === 1 ? width * 0.7 : width
              : photos.length === 1 ? width * 0.5 : width

            return photos.map(({ src, vertically }, index) =>
            <span key={index} {...a('PHOTO_RECT', { style: { margin } })}>
              <img {...{
                src,
                style: layouts.length === 1 && photos.length === 1
                  ? { objectFit: 'contain', maxHeight: height, width }
                  : { objectFit: 'cover', height, width }
              }} />
              <Click listener={() => actions['setPopdown']({ src, vertically })} />
            </span>
            )
          })}
        </div>
      }

    )(Atra({
      LAYOUTS: {
        style: {
          textAlign: 'center'
        }
      },
      PHOTO_RECT: {
        style: {
          position: 'relative',
          display: 'inline-block'
        }
      }
    })),

    video: Video
  }

  return (a =>

    ({ type, detail, actions }) =>
    <Fragment>
      {detail.caption && <div {...a('CAPTION')}>{detail.caption}</div>}
      {details[type](detail, actions)}
    </Fragment>

  )(Atra({
    CAPTION: {
      className: 'markdown-body',
      style: {
        width: '85%',
        marginLeft: '4%',
        color: 'rgb(72, 72, 72)',
        fontSize: '2.6em',
        letterSpacing: 4,
        lineHeight: 2,
        overflowX: 'hidden'
      }
    }
  }))
}

const HoDesktop = () => {

  const details = {

    photo: ((a) => ({ layouts }, actions) =>

      <Widthing children={(props) => {

        const parentWidth = props.width
        const marginSway = 5
        const marginTop = marginSway - 2
        const margin = `${marginTop}px ${marginSway}px 0px`

        return layouts.map(photos => {

          const width = (parentWidth / photos.length) - (marginSway * 2)
          const height = layouts.length === 1
            ? photos.length === 1 ? width * 0.7 : width
            : photos.length === 1 ? width * 0.5 : width

          return photos.map(({ src, vertically }, index) =>
          <span key={index} {...a('PHOTO_RECT', { style: { margin } })}>
            <img {...{
              src,
              style: layouts.length === 1 && photos.length === 1
                ? { objectFit: 'contain', maxHeight: height, width }
                : { objectFit: 'cover', height, width }
            }} />
            <MouseDown listener={() => actions['setPopdown']({ src, vertically })} />
          </span>
          )
        })
      }} />

    )(Atra({
      PHOTO_RECT: {
        style: {
          position: 'relative',
          display: 'inline-block',
          cursor: 'pointer'
        }
      }
    })),

    video: Video

  }

  return (a =>

    ({ type, detail, actions }) =>
    <Fragment>
      {detail.caption && <div {...a('CAPTION')}>{detail.caption}</div>}
      {details[type](detail, actions)}
    </Fragment>

  )(Atra({
    CAPTION: {
      className: 'markdown-body',
      style: {
        width: '90%',
        marginTop: 10,
        marginLeft: '4%',
        color: 'rgb(72, 72, 72)',
        fontSize: '1.2em',
        letterSpacing: 3,
        lineHeight: 2,
        overflowX: 'hidden'
      }
    }
  }))
}