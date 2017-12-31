// @flow
import React from 'react'
import Atra from 'atra'
import { Photo } from '../view'
import Widthing from './Widthing.jsx'
import { ExLayout, DeTextLayout, Block, Cover, MouseDown, More } from './components.jsx'

export default Photo(({
  store,
  renderDetail,
  setPopdown
}) => ({

  Exhibit: (a => ({ state, update }) =>

    <ExLayout>

      {Object.entries(state.posts).map(([ym,photos], index) =>

        <div key={index} {...a('YEAR_MONTH')}>

          <div {...a('YM')}>{ym}</div>

          {photos.map(({ src, summary }, index) =>

            <Block key={index}>

              <Cover {...a('BG_IMG', { style: { backgroundImage: `url(${src})` } })} />

              <Cover {...a('BG_COLOR')} />

              <div {...a('SUMMARY', { style: { visibility: !summary && 'hidden' } })}>{summary || '.'}</div>

              <MouseDown listener={() => renderDetail({ ym, index })} />

            </Block>

          )}

        </div>

      )}

      {(!state.done || state.done === 'fetching') && (

        <More fetching={state.done === 'fetching'}>
          <MouseDown listener={update} />
        </More>

      )}

    </ExLayout>

  )(Atra({
    YEAR_MONTH: {
      style: {
        color: '#ffffff',
        marginBottom: '8%',
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
    }
  })),

  Detail: (a => ({ data }) => {

    const { ym, index } = data
    const { caption, layouts } = store.posts[ym][index].detail

    return (
      <div>

        {caption && <DeTextLayout>{caption}</DeTextLayout>}

        <Widthing children={(props) => {

          const parentWidth = props.width
          const marginSway = 5
          const marginTop = marginSway - 2
          const margin = `${marginTop}px ${marginSway}px 0px`

          return layouts.map(photos => photos.map(({ src, vertically }, index) => {

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

                <MouseDown listener={() => setPopdown({ src, vertically })} />

              </span>
            )

          }))
        }} />

      </div>
    )

  })(Atra({
    PHOTO_RECT: {
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    }
  }))

}))