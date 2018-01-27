// @flow
import React, { Fragment } from 'react'
import Atra from 'atra'
import { Photo } from '../handle'
import { ExLayout, Block, Cover, Click, More } from './components.jsx'
import Player from 'react-player'
import { VideoPlay } from '../Icons.jsx'

export default Photo(() => {

  const details = {

    photo: ((a) => ({ layouts }, actions) => {

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

    })(Atra({
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

    video: ((a) => ({ poster, video }) =>

      <div {...a('ROOT')}>
        <Player {...a('PLAYER', {
          url: video,
          controls: true,
          config: {
            file: {
              attributes: { poster }
            }
          }
        })} />
      </div>

    )(Atra({
      ROOT: {
        style: {
          position: 'relative',
          backgroundColor: '#000',
          // textAlign: 'center',
          width: '98%',
          height: 650,
          margin: 'auto'
        }
      },
      PLAYER: {
        width: '100%',
        height: '100%'
      }
    }))
  }

  const videoIcon = <VideoPlay fill={'rgba(197, 197, 197, 0.6)'} />

  return {

    Exhibit: (a => ({ actions, posts, done }) =>

      <ExLayout>
        {Object.entries(posts).map(([ym,contents], index, { length }) =>
        <div key={index} {...{ style: { marginBottom: index !== length - 1 && '10%' } }}>
          <div {...a('YM')}>{`- - - - - - ${ym} - - - - - -`}</div>
          {contents.map(({ src, summary, type }, index) =>
          <Block key={index}>
            <Cover {...a('BG_IMG', { style: { backgroundImage: `url(${src})` } })} />
            <Cover {...a('BG_COLOR')} />
            <div {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>
              {summary || '.'}
            </div>
            {type === 'video' && <span {...a('VIDEO_TAG')}>{videoIcon}</span>}
            <Click listener={() => actions['renderDetail']({ ym, index })} />
          </Block>
          )}
        </div>
        )}
        {(!done || done === 'fetching') &&
          <More fetching={done === 'fetching'}><Click listener={actions['update']} /></More>}
      </ExLayout>

    )(Atra({
      YM: {
        style: {
          color: 'rgb(28, 28, 28)',
          fontSize: '1.2em',
          textAlign: 'center',
          marginTop: '4%',
          marginBottom: '4%'
        }
      },
      BG_IMG: {
        style: {
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'inherit'
        }
      },
      BG_COLOR: {
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 'inherit'
        }
      },
      SUMMARY: {
        style: {
          color: '#ffffff',
          position: 'relative',
          top: '35%',
          fontSize: '1.2em',
          textAlign: 'center'
        }
      },
      VIDEO_TAG: {
        style: {
          position: 'absolute',
          top: 0,
          left: 14,
          width: 90
        }
      }
    })),

    Detail: (a => ({ customProps, actions, posts }) => {

      const { ym, index } = customProps.data
      const { type, detail } = posts[ym][index]

      return <Fragment>
        {detail.caption && <div {...a('CAPTION')}>{detail.caption}</div>}
        {details[type](detail, actions)}
      </Fragment>

    })(Atra({
      CAPTION: {
        style: {
          width: '85%',
          marginLeft: '4%',
          color: 'rgb(72, 72, 72)',
          fontSize: '2.6em',
          letterSpacing: 3,
          lineHeight: 2,
          overflowX: 'hidden'
        }
      }
    }))

  }
})