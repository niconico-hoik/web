// @flow
import React from 'react'
import Atra from 'atra'
import { Photo } from '../view'
import { ExLayout, Block, Cover, Click, More, TouchEnd } from './components.jsx'

export default Photo(({
  store,
  renderDetail,
  setPopdown
}) => ({

  Exhibit: (a => ({ state, update }) =>

    <ExLayout>

      {Object.entries(state.posts).map(([ym,photos], index) =>

        <div key={index} {...a('YEAR_MONTH')}>

          <div {...a('YM')}>{`- - - - - - ${ym} - - - - - -`}</div>

          {photos.map(({ src, summary }, index) =>

            <Block key={index}>

              <Cover {...a('BG_IMG', { style: { backgroundImage: `url(${src})` } })} />

              <Cover {...a('BG_COLOR')} />

              <div {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>{summary || '.'}</div>

              <Click listener={() => renderDetail({ ym, index })} />

            </Block>

          )}

        </div>

      )}

      {(!state.done || state.done === 'fetching') && (

        <More fetching={state.done === 'fetching'}>
          <TouchEnd listener={update} />
        </More>

      )}

    </ExLayout>

  )(Atra({
    YEAR_MONTH: {
      style: {
        marginBottom: '10%'
      }
    },
    YM: {
      style: {
        color: 'rgb(28, 28, 28)',
        fontSize: '1.4em',
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
        top: '40%',
        fontSize: '0.9em',
        textAlign: 'center'
      }
    }
  })),

  Detail: (a => ({ data }) => {

    const { ym, index } = data
    const { caption, layouts } = store.posts[ym][index].detail

    const parentWidth = window.innerWidth - 5
    const marginSway = 5
    const marginTop = marginSway - 2
    const margin = `${marginTop}px ${marginSway}px 0px`

    return (
      <div>

        {caption && <div {...a('CAPTION')}>{caption}</div>}

        <div {...a('LAYOUTS')}>
          {layouts.map(photos => photos.map(({ src, vertically }, index) => {

            const width = (parentWidth / photos.length) - (marginSway * 2)

            const height = layouts.length === 1
              ? photos.length === 1 ? width * 0.7 : width
              : photos.length === 1 ? width * 0.5 : width

            return (
              <span key={index} {...a('PHOTO_RECT', { style: { margin } })}>

                <img {...{
                  src,
                  style: layouts.length === 1 && photos.length === 1
                    ? { objectFit: 'contain', maxHeight: height, width }
                    : { objectFit: 'cover', height, width }
                }} />

                <Click listener={() => setPopdown({ src, vertically })} />

              </span>
            )

          }))}
        </div>

      </div>
    )

  })(Atra({
    PHOTO_RECT: {
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    },
    CAPTION: {
      style: {
        width: '85%',
        marginLeft: '4%',
        color: 'rgb(72, 72, 72)',
        fontSize: '2.3em',
        letterSpacing: 3,
        lineHeight: 2,
        overflowX: 'hidden'
      }
    },
    LAYOUTS: {
      style: {
        textAlign: 'center'
      }
    }
  }))

}))