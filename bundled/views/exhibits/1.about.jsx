import React from 'react'
import Atra from 'atra'
import { Cover, Click, MouseDown } from '../Cover.jsx'

export default (isMobile, { ExhibitLayout, Block }) => {

  const Listener = isMobile ? Click : MouseDown

  return (a =>

    ({ abouts, renderDetail }) =>
    <ExhibitLayout>
      {Object.entries(abouts).map(([key, { title, description, backgroundColor, detail, unready }], index) =>
      <Block key={index}>
        <Cover {...a('BG_COLOR', { style: { backgroundColor } })} />
        <Cover {...a('BG_COVER')} />
        <div {...a('WRAP', {
          style: {
            ...unready && {
              textDecoration: 'line-through',
            }
          }
        })}>
          <div {...a('TITLE')}>{title}</div>
          <div {...a('DESCRIPTION')}>{description}</div>
        </div>
        
        {unready ?
        <div {...{
          style: {
            position: 'relative',
            fontSize: '3em',
            textAlign: 'center',
            ...isMobile && {
              top: -15,
            }
          },
          children: '🛠',
        }} />
        :
        <Listener listener={
          detail
          ? () => renderDetail({ elements: detail })
          : () => renderDetail({ simulationKey: key })
        } />}
        
      </Block>
      )}
    </ExhibitLayout>

  )(Atra({
    BG_COLOR: {
      style: {
        borderRadius: 'inherit'
      }
    },
    BG_COVER: {
      style: {
        backgroundColor: 'rgba(0,0,0,0.24)',
        borderRadius: 'inherit'
      }
    },
    WRAP: {
      style: isMobile ? {
        color: '#ffffff',
        position: 'relative',
        top: '30%',
        textAlign: 'center'
      } : {
        color: '#ffffff',
        position: 'relative',
        top: '32%',
        letterSpacing: 3,
        textAlign: 'center'
      }
    },
    TITLE: {
      style: {
        fontSize: '1.3em',
        marginBottom: 4
      }
    },
    DESCRIPTION: {
      style: {
        fontSize: '0.7em'
      }
    }
  }))
}
