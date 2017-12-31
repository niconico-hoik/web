// @flow
import React from 'react'
import Atra from 'atra'
import Center from 'react-vertical-center'
import { Home } from '../view'
import { Rogo } from '../Icons.jsx'

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
        <div {...{
          style: {
            width: '80%',
            margin: 'auto'
          }
        }}>
          <Rogo />
        </div>

        <div {...a('TEXT')}>
          <span>{POSTAL}</span><br />
          <span>{ADDRESS}</span><br />
          <span>{BUILDING}</span><br />
          <span>{'→ '}</span>
          <span {...{ style: {
            display: 'inline-block',
            background: 'rgb(24, 24, 35)',
            color: '#ffffff',
            fontWeight: 'bold',
            lineHeight: 1.2,
            padding: '4px 8px'
          } }}>{'≡'}</span>
        </div>
      </Center>

    </div>

  )(Atra({
    ROOT: {
      style: {
        height: '100%'
      }
    },
    TEXT: {
      style: {
        position: 'relative',
        top: -50,
        textAlign: 'center',
        color: 'rgb(147, 147, 147)',
        fontSize: '1.8em',
        fontWeight: 'bold',
        lineHeight: 2.1,
        letterSpacing: 4
      }
    },
    MAP_LINK: {
      href: 'https://goo.gl/maps/THnM3UX6ytF2',
      target: '_blank',
      style: {
        color: 'white',
        borderBottom: 'dashed 1.5px'
      }
    }
  })),

  // Detail: (a => (props) => false
  //
  // )(Atra({
  //
  // }))

}))