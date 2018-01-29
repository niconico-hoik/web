// @flow
import React from 'react'
import Atra from 'atra'
import Center from 'react-centpn'
import { Home } from '../handle'
import { Rogo } from '../Icons.jsx'
import { Click } from './components.jsx'

export default Home(() => ({

  Exhibit: (a => {

    const rogo = <Rogo />

    const arrow = (
      <span {...{
        style: {
          position: 'relative',
          top: -2.5
        }
      }}>
        {' → '}
      </span>
    )

    const triple = (
      <span {...{
        style: {
          display: 'inline-block',
          background: 'rgb(24, 24, 35)',
          color: '#ffffff',
          fontWeight: 'bold',
          lineHeight: 1.2,
          padding: '4px 8px 2px'
        }
      }}>
        <span {...{
          style: {
            position: 'relative',
            left: 2.4
          }
        }}>
          {'≡'}
        </span>
      </span>
    )

    return ({ informations, renderDetail }) =>
    <div {...a('ROOT')}>
      <Center top={-60}>
        <div {...a('ROGO')}>{rogo}</div>
        <div {...a('TEXT')}>
          <span>{informations.postal}</span><br />
          <span>{informations.address}</span><br />
          <span>{informations.building}</span>{arrow}{triple}<br />
          <span {...a('PREVIEW_WRAP')}>
            <span {...a('PREVIEW_TEXT')}>{'Preview'}</span>
            <Click listener={renderDetail} />
          </span>
        </div>
      </Center>
    </div>

  })(Atra({
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

  Detail: ({ preview }) =>
    <div {...{
      className: 'markdown-body',
      style: {
        fontSize: '2.6em',
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2,
        margin: '0px 20px'
      }
    }}>
      {preview}
    </div>

}))