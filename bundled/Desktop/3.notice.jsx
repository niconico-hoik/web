// @flow
import React from 'react'
import Atra from 'atra'
import { Notice } from '../handle'
import { ExLayout, Block, MouseDown, Cover, More } from './components.jsx'

export default Notice(() => ({

  Exhibit: (a => ({ customProps, actions, posts, done }) =>

    <ExLayout>
      <div {...a('BLOCKS')}>
        {posts.map(({ summary, date, isNew, season, detail }, index) =>
        <Block key={index}>
          <div {...a('SEASON')}>{customProps.seasons[season]}</div>
          <Cover {...a('BG_COVER')} />
          <div {...a('SUMMARY')}>{summary}</div>
          <span {...a('DATE')}>{date}</span>
          {isNew && <span {...a('NEW')}>{`new!!`}</span>}
          <MouseDown listener={() =>
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
          <MouseDown listener={actions['update']} />
        </More>
      </div>
      }
    </ExLayout>

  )(Atra({
    BLOCKS: {
      style: {
        color: '#ffffff',
        letterSpacing: 3
      }
    },
    SEASON: {
      style: {
        position: 'absolute',
        bottom: -35,
        left: -50,
        width: 210
      }
    },
    BG_COVER: {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        borderRadius: 'inherit'
      }
    },
    SUMMARY: {
      style: {
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
      style: {
        marginTop: '8%'
      }
    }
  })),

  Detail: ({ body }) =>
    <div {...{
      className: 'markdown-body',
      style: {
        margin: '0px 20px',
        fontSize: '1.3em',
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2
      },
      children: body
    }} />

}))