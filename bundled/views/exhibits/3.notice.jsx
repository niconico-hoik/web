import React, { Fragment } from 'react'
import Atra from 'atra'
import { Cover, MouseDown, Click } from '../Cover.jsx'

export default (isMobile, { ExhibitLayout, Block, More }) => {

  const Listener = isMobile ? Click : MouseDown

  return (a => ({ customProps, actions, posts, done }) =>

    <ExhibitLayout>
      <div {...a('BLOCKS')}>
        {posts.map(({ summary, date, isNew, season, detail }, index) =>
        <Block key={index}>
          <div {...a('SEASON')}>{customProps.seasons[season]}</div>
          <Cover {...a('BG_COVER')} />
          <div {...a('SUMMARY')}>{summary}</div>
          <span {...a('DATE')}>{date}</span>
          {isNew && <span {...a('NEW')}>{`new!!`}</span>}
          <Listener listener={() =>
            actions['renderDetailThen']({
              detail,
              isNew,
              index
            })
          } />
        </Block>
        )}
      </div>
      {(!done || done === 'fetching') &&
      <div {...a('MORE')}>
        <More fetching={done === 'fetching'}>
          <Listener listener={actions['update']} />
        </More>
      </div>
      }
    </ExhibitLayout>

  )(Atra({
    BLOCKS: {
      style: isMobile ? {
        color: '#ffffff'
      } : {
        color: '#ffffff',
        letterSpacing: 3
      }
    },
    SEASON: {
      style: isMobile ? {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 400
      } : {
        position: 'absolute',
        bottom: -35,
        left: -50,
        width: 210
      }
    },
    BG_COVER: {
      style: {
        backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.67)',
        borderRadius: 'inherit'
      }
    },
    SUMMARY: {
      style: isMobile ? {
        position: 'relative',
        top: '35%',
        fontSize: '1.2em',
        textAlign: 'center'
      } : {
        position: 'relative',
        top: '40%',
        fontSize: '0.9em',
        textAlign: 'center'
      }
    },
    DATE: {
      style: {
        position: 'absolute',
        top: 4,
        left: 8,
        fontSize: '0.8em',
        color: 'rgba(255, 255, 255, 1)'
      }
    },
    NEW: {
      style: {
        position: 'absolute',
        top: 4,
        right: 8
      }
    },
    MORE: {
      style: isMobile ? {

      } : {
        marginTop: '8%'
      }
    }
  }))
}