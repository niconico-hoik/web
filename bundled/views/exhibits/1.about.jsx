import React from 'react'
import Atra from 'atra'
import { Cover, Click, MouseDown } from '../Cover.jsx'

export default (isMobile, { ExhibitLayout, Block }) => {

  const Listener = isMobile ? Click : MouseDown

  return (a =>

    ({ abouts, renderDetail }) =>
    <ExhibitLayout>
      {Object.entries(abouts).map(([key, { title, description, backgroundColor }], index) =>
      <Block key={index}>
        <Cover {...a('BG_COLOR', { style: { backgroundColor } })} />
        <Cover {...a('BG_COVER')} />
        <div {...a('WRAP')}>
          <div {...a('TITLE')}>{title}</div>
          <div {...a('DESCRIPTION')}>{description}</div>
        </div>
        <Listener listener={() =>
          abouts[key].detail
            ? renderDetail({ elements: abouts[key].detail })
            : renderDetail({ simulationKey: key })}
        />
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