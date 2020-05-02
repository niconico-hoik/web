import React, { Fragment } from 'react'
import Atra from 'atra'
import { Month as MonthSimu, Temp as TempSimu } from './simulation'
import { IconSimulate } from '../Icons.jsx'

const jsx = (Component, props) => <Component {...props} />

export default (isMobile) => {

  const SimuTitle = (a =>

    ({ title }) =>
    <div {...a('TITLE')}>
      <span {...a('STRING')}>{title}</span>
      <span {...a('ICON')}><IconSimulate /></span>
    </div>

  )(Atra({
    TITLE: {
      style: isMobile ? {
        position: 'relative',
        textAlign: 'left',
        marginBottom: 60,
        marginLeft: 30
      } : {
        textAlign: 'center',
        position: 'relative',
        marginBottom: 40
      }
    },
    STRING: {
      style: isMobile ? {
        letterSpacing: 4
      } : {
        fontSize: '1.4em',
        letterSpacing: 4
      }
    },
    ICON: {
      style: isMobile ? {
        display: 'inline-block',
        width: 66,
        position: 'absolute',
        top: 5,
        marginLeft: 4
      } : {
        display: 'inline-block',
        width: 38,
        position: 'absolute',
        top: 1,
        marginLeft: 4
      }
    }
  }))

  const simulations = {

    month_simu: (simuProps =>

      ({ isContinued }) =>
      <Fragment>
        <SimuTitle title={'月極保育シミュレーション'} />
        <MonthSimu isContinued={isContinued} {...simuProps} />
      </Fragment>

    )(
      isMobile ? {
        selectspace: 30,
        blockspace: 95,
        resultsLeft: '-12%'
      } : {
        selectspace: 18,
        blockspace: 36,
        resultsLeft: '-5%'
      }
    ),

    temp_simu: (simuProps =>

      ({ isContinued }) =>
      <Fragment>
        <SimuTitle title={'一時預かりシミュレーション'} />
        <TempSimu isContinued={isContinued} {...simuProps} />
      </Fragment>

    )(
      isMobile ? {
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
      } : {
        selectspace: 18,
        blockspace: 36,
        resultsLeft: 0,
        badgeStyle: {
          position: 'absolute',
          right: 80,
          fontSize: '0.75em',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          padding: '8px 8px 6px'
        }
      }
    )

  }

  const attributesMarkdown = {
    className: 'markdown-body',
    style: isMobile ? {
      margin: '0px 4%',
      fontSize: '2.6em'
    } : {
      margin: '0px 10%'
    }
  }

  const attributesSimulation = {
    style: isMobile ? {
      marginTop: 40,
      marginBottom: 100,
      fontSize: '3.2em'
    } : {
      marginTop: 40,
      marginBottom: 60
    }
  }

  return (a =>

    ({ elements, simulationKey, isContinued }) =>

    Boolean(elements)

      ? <div {...a('ROOT', attributesMarkdown)}>
        {elements}
      </div>

      : <div {...a('ROOT', attributesSimulation)}>
        {
          !!simulations[simulationKey] &&
          jsx(simulations[simulationKey], { isContinued })
        }
      </div>

  )(Atra({
    ROOT: {
      style: isMobile ? {
        color: 'rgb(72, 72, 72)',
        letterSpacing: 4,
      } : {
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2,
        fontSize: '1.3em'
      }
    }
  }))
}