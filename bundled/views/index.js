import React from 'react'
import Atra from 'atra'
import handles from './handles'
import exhibits from './exhibits'
import details from './details'

export default (isMobile) => {

  const components = commonComponents(isMobile)

  return handles.map((Handle, index) => {
    const HighOrderExhibit = exhibits[index]
    const HighOrderDetail = details[index]
    return Handle({
      Exhibit: HighOrderExhibit(isMobile, components),
      Detail: HighOrderDetail(isMobile, components)
    })
  })
}

const commonComponents = (isMobile) => ({

  ExhibitLayout: (a =>

    ({ children }) =>
      <div {...a('LAYOUT')}>{children}</div>

  )(Atra({
    LAYOUT: {
      style: isMobile ? {
        width: '99%',
        margin: 'auto',
        fontSize: '2.2em'
      } : {
        width: '99%',
        margin: 'auto'
      }
    }
  })),

  Block: (a =>

    ({ height, children }) =>
      <div {...a('BLOCK', {
        style: Object.assign({}, height && { height })
      })}>
        {children}
      </div>

  )(Atra({
    BLOCK: {
      style: isMobile ? {
        position: 'relative',
        height: 320,
        borderRadius: 7,
        margin: 16,
        overflow: 'hidden',
        letterSpacing: 5
      } : {
        position: 'relative',
        height: 180,
        borderRadius: 7,
        margin: 6,
        overflow: 'hidden',
        cursor: 'pointer'
      }
    }
  })),

  More: (a =>

    ({ fetching, children }) =>
      <div {...a('ROOT')}>
        <span {...a('MESSAGE', { style: { visibility: fetching && 'hidden' } })}>
          {'つづく'}
          {children}
        </span>
      </div>

  )(Atra({
    ROOT: {
      style: isMobile ? {
        marginTop: '8%',
        marginBottom: '10%',
        textAlign: 'center'
      } : {
        margin: 'auto',
        marginTop: '8%',
        marginBottom: '9%',
        textAlign: 'center'
      }
    },
    MESSAGE: {
      style: isMobile ? {
        position: 'relative',
        color: 'rgb(28, 28, 28)',
        fontSize: '1.6em',
        letterSpacing: 20,
        padding: '2px 8px',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 4
      } : {
        position: 'relative',
        fontSize: '1.6em',
        color: '#ffffff',
        letterSpacing: 10,
        padding: '2px 8px',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 3,
        cursor: 'pointer'
      }
    }
  }))

})