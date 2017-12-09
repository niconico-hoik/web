// @flow
import React from 'react'
import Atra from 'atra'

export default ({ backgroundColor, title, description, onClick }) =>
  <div {...a('ROOT', { onClick, style: { backgroundColor } })}>
    <div {...a('COVER')} />
    <div {...a('WRAP')}>
      <div {...a('TITLE')}>{title}</div>
      <div {...a('DESCRIPTION')}>{description}</div>
    </div>
  </div>

const a = Atra({
  'ROOT': {
    style: {
      width: '97%',
      height: 260,
      margin: '16px auto',
      position: 'relative'
    }
  },
  'COVER': {
    style: {
      // backgroundColor: 'rgba(0,0,0,0.2)',
      backgroundColor: 'rgba(0,0,0,0.24)',
      // backgroundColor: 'rgba(0,0,0,0.1)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  'WRAP': {
    style: {
      color: '#ffffff',
      position: 'relative',
      top: '28%'
    }
  },
  'TITLE': {
    style: {
      fontSize: '2.7em',
      fontWeight: 'bold',
			letterSpacing: 3,
      marginLeft: 45,
      marginBottom: 5
    }
  },
  'DESCRIPTION': {
    style: {
			marginLeft: 50,
			fontSize: '1.4em',
			letterSpacing: 4
    }
  }
})