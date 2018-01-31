import React, { Fragment } from 'react'
import Atra from 'atra'
import { Cover, MouseDown, Click } from '../Cover.jsx'
import { VideoPlay } from '../Icons.jsx'

const videoIcon = <VideoPlay fill={'rgba(197, 197, 197, 0.6)'} />

export default (isMobile, { ExhibitLayout, Block, More }) => {

  const {
    postMarginBottom,
    Listener,
    blockHeight,
  } = isMobile
  ? {
    postMarginBottom: '14%',
    Listener: Click,
    blockHeight: 440
  }
  : {
    postMarginBottom: '8%',
    Listener: MouseDown
  }

  return (a =>

    ({ actions, posts, done }) =>
    <ExhibitLayout>

      {Object.entries(posts).map(([ym,contents], index, { length }) =>
      <div key={index} {...a('YEAR_MONTH', { style: { marginBottom: index !== length - 1 && postMarginBottom } })}>

        <div {...a('YM')}>{ym}</div>

        {contents.map(({ src, summary, type, detail }, index) =>
        <Block key={index} height={blockHeight}>

          <Cover {...a('BG_IMG', { style: { backgroundImage: `url(${src})` } })} />
          <Cover {...a('BG_COLOR')} />

          <div {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>{summary || '.'}</div>

          {type === 'video' && <span {...a('VIDEO_TAG')}>{videoIcon}</span>}

          <Listener listener={() => actions['renderDetail']({ type, detail })} />

        </Block>
        )}

      </div>
      )}

      {(!done || done === 'fetching') &&
      <More fetching={done === 'fetching'}>
        <Listener listener={actions['update']} />
      </More>}

    </ExhibitLayout>

  )(Atra({
    YEAR_MONTH: {
      style: {
        color: '#ffffff'
      }
    },
    YM: {
      style: isMobile ? {
        fontSize: '1.2em',
        marginTop: '4%',
        marginBottom: '2%',
        marginLeft: '4%',
        color: 'rgb(62, 62, 62)',
        fontWeight: 'bold'
      } : {
        fontSize: '1.2em',
        marginTop: '3%',
        marginBottom: '1%',
        marginLeft: '2%'
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
        backgroundColor: isMobile ? 'rgba(25, 25, 25, 0.3)' : 'rgba(0, 0, 0, 0.4)',
        borderRadius: 'inherit'
      }
    },
    SUMMARY: {
      style: isMobile ? {
        position: 'relative',
        top: '37%',
        fontSize: '1.2em',
        textAlign: 'center'
      } : {
        position: 'relative',
        top: '40%',
        fontSize: '0.9em',
        textAlign: 'center',
        letterSpacing: 3
      }
    },
    VIDEO_TAG: {
      style: isMobile ? {
        position: 'absolute',
        top: 0,
        left: 14,
        width: 90
      } : {
        position: 'absolute',
        top: 0,
        left: 11,
        width: 70
      }
    }
  }))
}