// @flow
import React, { Fragment } from 'react'
import Atra from 'atra'
import { Photo } from '../handle'
import { ExLayout, Block, Cover, MouseDown, More } from './components.jsx'
import Widthing from './Widthing.jsx'
import Video from './Video.jsx'
import { VideoPlay } from '../Icons.jsx'

export default Photo(() => ({

  Exhibit: (a => {

    const videoIcon = <VideoPlay fill={'rgba(197, 197, 197, 0.6)'} />

    return ({ actions, posts, done }) =>
    <ExLayout>
      {Object.entries(posts).map(([ym,contents], index, { length }) =>
      <div key={index} {...a('YEAR_MONTH', { style: { marginBottom: index !== length - 1 && '8%' } })}>
        <div {...a('YM')}>{ym}</div>
        {contents.map(({ src, summary, type, detail }, index) =>
        <Block key={index}>
          <Cover {...a('BG_IMG', { style: { backgroundImage: `url(${src})` } })} />
          <Cover {...a('BG_COLOR')} />
          <div {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>{summary || '.'}</div>
          {type === 'video' && <span {...a('VIDEO_TAG')}>{videoIcon}</span>}
          <MouseDown listener={() => actions['renderDetail']({ type, detail })} />
        </Block>
        )}
      </div>
      )}
      {(!done || done === 'fetching') &&
        <More fetching={done === 'fetching'}><MouseDown listener={actions['update']} /></More>}
    </ExLayout>

  })(Atra({
    YEAR_MONTH: {
      style: {
        color: '#ffffff'
      }
    },
    YM: {
      style: {
        fontSize: '1.2em',
        marginLeft: '2%',
        marginTop: '3%',
        marginBottom: '1%'
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 'inherit'
      }
    },
    SUMMARY: {
      style: {
        position: 'relative',
        top: '40%',
        fontSize: '0.9em',
        letterSpacing: 3,
        textAlign: 'center'
      }
    },
    VIDEO_TAG: {
      style: {
        position: 'absolute',
        top: 0,
        left: 11,
        width: 70
      }
    }
  })),

  Detail: (a => {

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

      video: ({ poster, video }) => <Video {...{ poster, video }} />

    }

    return ({ type, detail, actions }) =>
    <Fragment>
      {detail.caption && <div {...a('CAPTION')}>{detail.caption}</div>}
      {details[type](detail, actions)}
    </Fragment>

  })(Atra({
    CAPTION: {
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

}))