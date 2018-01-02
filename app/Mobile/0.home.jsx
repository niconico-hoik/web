// @flow
import React from 'react'
import Atra from 'atra'
import Center from 'react-vertical-center'
import { Home } from '../view'
import { Rogo } from '../Icons.jsx'
import { Click } from './components.jsx'

const rogo = <Rogo />
const NAME = 'ニコニコ保育園 和泉中央園'
const POSTAL = '〒594-1105'
const ADDRESS = '大阪府和泉市のぞみ野三丁目1237-58'
const BUILDING = 'Shima.B.L.D.G 1F'
const TEL = '0725-56-3396'

export default Home(({
  preview,
  renderDetail
}) => ({

  Exhibit: (a => () =>

    <div {...a('ROOT')}>

      <Center deduct={60}>

        <div {...a('ROGO')}>{rogo}</div>

        <div {...a('TEXT')}>

          <span>{POSTAL}</span><br />
          <span>{ADDRESS}</span><br />
          <span>{BUILDING}</span>
          <span {...a('ARROW')}>{' → '}</span>
          <Triple /><br />

          <span {...a('PREVIEW_WRAP')}>
            <span {...a('PREVIEW_TEXT')}>{'Preview'}</span>
            <Click listener={renderDetail} />
          </span>

        </div>

      </Center>

    </div>

  )(Atra({
    ROOT: {
      style: {
        height: '100%',
        textAlign: 'center',
        color: 'rgb(80, 80, 80)',
        fontSize: '2.1em',
        fontWeight: 'bold',
        letterSpacing: 4
      }
    },
    ROGO: {
      style: {
        width: '80%',
        margin: 'auto'
      }
    },
    TEXT: {
      style: {
        position: 'relative',
        top: -54,
        lineHeight: 2.1
      }
    },
    ARROW: {
      style: {
        position: 'relative',
        top: -2.5
      }
    },
    MAP_LINK: {
      href: 'https://goo.gl/maps/THnM3UX6ytF2',
      target: '_blank',
      style: {
        color: 'white',
        borderBottom: 'dashed 1.5px'
      }
    },
    PREVIEW_WRAP: {
      style: {
        position: 'relative',
        display: 'inline-block',
        marginTop: 24
      }
    },
    PREVIEW_TEXT: {
      style: {
        borderBottomStyle: 'dashed',
        borderColor: 'inherit',
        borderWidth: 4,
        padding: '0 4px'
      }
    },
  })),

  Detail: () =>
    <div {...{
      className: 'markdown-body',
      style: {
        fontSize: '2.3em',
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2,
        margin: '0px 20px'
      }
    }}>
      {preview}
    </div>

}))

const Triple = (a => () =>

  <span {...a('WRAP')}>
    <span {...a('STRING')}>
      {'≡'}
    </span>
  </span>

)(Atra({
  WRAP: {
    style: {
      display: 'inline-block',
      background: 'rgb(24, 24, 35)',
      color: '#ffffff',
      fontWeight: 'bold',
      lineHeight: 1.2,
      padding: '4px 8px 2px'
    }
  },
  STRING: {
    style: {
      position: 'relative',
      left: 2.4
    }
  }
}))