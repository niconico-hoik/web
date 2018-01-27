// @flow
import React from 'react'
import Atra from 'atra'
import { Notice } from '../handle'
import { ExLayout, Block, Click, Cover, More } from './components.jsx'

export default Notice(() => ({

  Exhibit: (a => ({ customProps, actions, posts, done }) =>

    <ExLayout>
      <div {...a('BLOCKS')}>
        {posts.map(({ summary, date, isNew, season }, index) =>
        <Block key={index}>
          <div {...a('SEASON')}>{customProps.seasons[season]}</div>
          <Cover {...a('BG_COVER')} />
          <div {...a('SUMMARY')}>{summary}</div>
          <span {...a('DATE')}>{date}</span>
          {isNew && <span {...a('NEW')}>{`new!!`}</span>}
          <Click listener={() => actions['renderDetailThen']({ index, isNew })} />
        </Block>
        )}
      </div>
      {(!done || done === 'fetching') &&
        <More fetching={done === 'fetching'}><Click listener={actions['update']} /></More>}
    </ExLayout>

  )(Atra({
    BLOCKS: {
      style: {
        color: '#ffffff'
      }
    },
    SEASON: {
      style: {
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 400
      }
    },
    BG_COVER: {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 'inherit'
      }
    },
    SUMMARY: {
      style: {
        position: 'relative',
        top: '35%',
        fontSize: '1.2em',
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
    }
  })),

  Detail: ({ customProps, posts }) => {
    const { index } = customProps.data
    const post = posts[index] || {}
    const { body } = post.detail || {}

    return <div {...{
      className: 'markdown-body',
      style: {
        fontSize: '2.6em',
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2,
        margin: '0px 20px'
      },
      children: body
    }} />
  }

}))