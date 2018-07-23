import React from 'react'
import Atra from 'atra'
import Centpn from 'react-centpn'
import Parade from 'react-parade'
import { Rogo } from '../Icons.jsx'
import { Cover, Click, MouseDown } from '../Cover.jsx'
import { numToArr } from '../util.js'

export default (isMobile) =>
  isMobile
    ? HoMobile()
    : HoDesktop()

const HoMobile = () => {

  const rogo = <Rogo />

  return (a =>

    ({ informations, renderDetail }) =>
    <div {...a('ROOT')}>
      <Centpn top={-90}>
        <div {...a('ROGO')}>{rogo}</div>
        <div {...a('TEXT')}>
          <span {...a('PREVIEW_WRAP')}>
            <span {...a('PREVIEW_TEXT')}>{'preview'}</span>
            <Click listener={renderDetail} />
          </span>
        </div>
      </Centpn>
    </div>

  )(Atra({
    ROOT: {
      style: {
        height: '100%',
        textAlign: 'center'
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
        top: -12
      }
    },
    PREVIEW_WRAP: {
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    },
    PREVIEW_TEXT: {
      style: {
        color: 'rgb(12, 26, 79)',
        fontSize: '2.1em',
        fontWeight: 'bold',
        letterSpacing: 3,
        borderStyle: 'dashed',
        borderColor: 'inherit',
        borderWidth: 4,
        padding: '14px 28px',
        backgroundColor: 'rgba(255, 255, 255, 0.45)'
      }
    }
  }))
}

const HoDesktop = () => {

  const circles = numToArr(12).map((u, index) => <circle key={index} r='2' />)

  const parades = [
    {
      d: 'M 33.108108,32.432432 127.7027,16.216216 191.21622,112.83784 72.972973,138.51351 H 268.91892 l -8.10811,-46.621618 75,46.621618 L 68.918919,306.75676 395.94595,166.21622 354.72973,68.243243 581.75676,118.91892 420.27027,366.89189 284.45946,308.10811 420.94595,277.7027 362.16216,231.08108 508.78378,309.45946 552.7027,416.21622 54.72973,554.05405 81.081081,173.64865 222.2973,401.35135 l 51.35135,-58.10811 262.83784,227.70271 36.48648,-87.83784 -320.94594,-167.56757 29.72973,99.32432 -89.86487,-5.4054 -55.4054,88.51351 L 128.37838,106.75676 18.918919,69.594595 Z',
      fill: '#edf73f'
    },
    {
      d: 'M 561.70812,26.413012 577.92434,121.0076 481.30271,184.52112 455.62704,66.277872 V 262.22382 l 46.62162,-8.10811 -46.62162,75 L 287.38379,62.223822 427.92433,389.25085 525.89731,348.03463 475.22163,575.06166 227.24866,413.57517 286.03244,277.76436 316.43785,414.25085 363.05947,355.46706 284.68109,502.08868 177.92433,546.0076 40.086501,48.034632 420.4919,74.385982 192.7892,215.6022 l 58.10811,51.35135 -227.702709,262.83784 87.837839,36.48648 167.56757,-320.94594 -99.32432,29.72973 5.4054,-89.86487 -88.513509,-55.4054 391.216209,-8.10811 37.16217,-109.459458 z',
      fill: '#ffa9a9'
    },
    {
      d: 'm 39.127527,561.03244 -16.21622,-94.59458 96.621633,-63.51352 25.67567,118.24324 0,-195.94594 -46.621623,8.10811 46.621623,-75 L 313.45186,525.22163 172.91132,198.19461 74.938337,239.41083 125.61402,12.383798 373.58699,173.87029 314.80321,309.6811 284.3978,173.19461 237.77618,231.9784 316.15456,85.356778 422.91132,41.437858 560.74915,539.41082 180.34375,513.05947 408.04645,371.84326 349.93834,320.49191 577.64105,57.654068 489.80321,21.167588 322.23564,342.11353 l 99.32432,-29.72973 -5.4054,89.86487 88.51351,55.4054 -391.21621,8.10811 -37.162173,109.45945 z',
      fill: '#522d77'
    }
  ].map(({ d, fill }, index) =>
    <Parade key={index} {...{ d }}>
      <g {...{ style: { fill }}}>
        {circles}
      </g>
    </Parade>
  )

  return (a =>

    ({ informations, renderDetail }) =>
    <div {...a('ROOT')}>
      <svg {...a('BG_SVG')}>{parades}</svg>
      <Cover {...a('BG_COVER')} />
      <Centpn top={-5}>
        <div {...a('TEXT')}>
          <span>{informations.name}</span><br />
          <span>{'-'}</span><br />
          <span>{informations.postal}</span><br />
          <span>{informations.address}</span><br />
          <span>{informations.building}</span><br />
          <span>{'-'}</span><br />
          <span>{`tel: ${informations.tel}`}</span>
          <div {...a('LINKS')}>
            <span {...a('SHOWING')}>
              <span>{`Preview`}</span>
              <MouseDown listener={renderDetail} />
            </span>
            <a {...a('MAP_LINK')}>{'Map'}</a>
          </div>
        </div>
      </Centpn>
    </div>

  )(Atra({
    ROOT: {
      style: {
        height: '100%'
      }
    },
    BG_SVG: {
      viewBox: '0 0 600 600',
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }
    },
    BG_COVER: {
      style: {
        backgroundColor: 'rgba(0,0,0,0.25)'
      }
    },
    TEXT: {
      style: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: '1em',
        lineHeight: 2.5,
        letterSpacing: 4
      }
    },
    LINKS: {
      style: {
        marginTop: 12
      }
    },
    MAP_LINK: {
      href: 'https://goo.gl/maps/THnM3UX6ytF2',
      target: '_blank',
      style: {
        color: '#ffffff',
        borderBottom: 'dashed 1.5px',
        textDecoration: 'none'
      }
    },
    SHOWING: {
      style: {
        position: 'relative',
        marginRight: 45,
        borderBottom: 'dashed 1.5px',
        cursor: 'pointer'
      }
    }
  }))
}