// @flow
import React from 'react'
import Atra from 'atra'
import { Notice } from '../view'
import { ExLayout, DeTextLayout, Block, Click, Cover, More } from './components.jsx'
import { Spring, Summer, Fall, Winter } from '../Icons.jsx'

const seasons = {
  spring: Spring,
  summer: Summer,
  fall: Fall,
  winter: Winter
}

export default Notice(({
  store,
  renderDetail,
  setPopdown,
  setInform
}) => ({

  Exhibit: (a => ({ state, update, transform }) =>

    <ExLayout>

      <div {...a('BLOCKS')}>
        {state.posts.map(({ summary, date, isNew, season }, index) => {

          const Season = seasons[season]

          return (
            <Block key={index}>

              <div {...a('SEASON')}><Season /></div>

              <Cover {...a('BG_COVER')} />

              <div {...a('SUMMARY')}>{summary}</div>

              <span {...a('DATE')}>{date}</span>

              {isNew && <span {...a('NEW')}>{`new!!`}</span>}

              <Click listener={() =>
                renderDetail({ index }).then(() =>
                  isNew && transform(({ posts }) => {
                    posts = [].concat(posts)
                    posts[index] = Object.assign({}, posts[index], { isNew: false })
                    const inform = posts.filter(({ isNew }) => isNew).length
                    const nextState = { posts }
                    return setInform(inform).then(() => nextState)
                  })
                )
              } />

            </Block>
          )
        })}
      </div>

      {(!state.done || state.done === 'fetching') &&
        <div {...a('MORE')}>
          <More fetching={state.done === 'fetching'}>
            <Click listener={update} />
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
        bottom: -80,
        left: -80,
        width: 400
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

  Detail: ({ data }) => {
    const { index } = data
    const post = store.posts[index] || {}
    const { body } = post.detail || {}

    return <DeTextLayout>{body}</DeTextLayout>
  }

}))