// @flow
import React, { Fragment } from 'react'
import Atra from 'atra'
import { About } from '../handle'
import { Month as MonthSimu, Temp as TempSimu } from '../simulation'
import { IconSimulate } from '../Icons.jsx'
import { ExLayout, Block, Cover, Click } from './components.jsx'

export default About(() => {

  const SimuTitle = (a => {

    const icon = <IconSimulate />

    return ({ title }) =>
    <div {...a('TITLE')}>
      <span {...a('STRING')}>{title}</span>
      <span {...a('ICON')}>{icon}</span>
    </div>

  })(Atra({
    TITLE: {
      style: {
        position: 'relative',
        textAlign: 'left',
        marginBottom: 60,
        marginLeft: 30
      }
    },
    STRING: {
      style: {
        letterSpacing: 4
      }
    },
    ICON: {
      style: {
        display: 'inline-block',
        width: 66,
        position: 'absolute',
        top: 5,
        marginLeft: 4
      }
    }
  }))

  const simulations = {

    month_simu: ({ isContinued }) => (
      <Fragment>
        <SimuTitle title={'月極保育シミュレーション'} />
        <MonthSimu {...{
          isContinued,
          selectspace: 30,
          blockspace: 95,
          resultsLeft: '-12%'
        }} />
      </Fragment>
    ),

    temp_simu: ({ isContinued }) => (
      <Fragment>
        <SimuTitle title={'一時預かりシミュレーション'} />
        <TempSimu {...{
          isContinued,
          selectspace: 30,
          blockspace: 95,
          resultsLeft: '3%',
          badgeStyle: {
            position: 'absolute',
            top: 19,
            right: '110%',
            fontSize: '0.6em',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            padding: '6px 6px 4px'
          }
        }} />
      </Fragment>
    )
  }

  return {

    Exhibit: (a => ({ abouts, renderDetail }) =>

      <ExLayout>
        {Object.entries(abouts).map(([key, { title, description, backgroundColor }], index) =>
        <Block key={index}>
          <Cover {...a('BG_COLOR', { style: { backgroundColor } })} />
          <Cover {...a('BG_COVER')} />
          <div {...a('WRAP')}>
            <div {...a('TITLE')}>{title}</div>
            <div {...a('DESCRIPTION')}>{description}</div>
          </div>
          <Click listener={() => renderDetail({ key })} />
        </Block>
        )}
      </ExLayout>

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
        style: {
          color: '#ffffff',
          position: 'relative',
          top: '30%',
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
    })),

    Detail: (a => ({ abouts, customProps }) => {

      let detail, addition;
      const { key } = customProps.data

      if (abouts[key].detail) {
        detail = abouts[key].detail
        addition = {
          className: 'markdown-body',
          style: {
            margin: '0px 20px',
            fontSize: '2.6em'
          }
        }
      } else {
        const Simulation = simulations[key]
        const { isContinued } = customProps
        detail = <Simulation {...{ isContinued }} />
        addition = {
          style: {
            marginTop: 40,
            marginBottom: 140,
            fontSize: '3.2em'
          }
        }
      }

      return <div {...a('ROOT', addition)}>{detail}</div>
    }

    )(Atra({
      ROOT: {
        style: {
          color: 'rgb(72, 72, 72)',
          letterSpacing: 2
        }
      }
    }))

  }
})