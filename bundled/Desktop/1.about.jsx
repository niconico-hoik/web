// @flow
import React, { Fragment } from 'react'
import Atra from 'atra'
import { About } from '../handle'
import { Month as MonthSimu, Temp as TempSimu } from '../simulation'
import { IconSimulate } from '../Icons.jsx'
import { ExLayout, Block, Cover, MouseDown } from './components.jsx'

export default About(() => ({

  Exhibit: (a => {

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
          textAlign: 'center',
          position: 'relative',
          marginBottom: 40
        }
      },
      STRING: {
        style: {
          fontSize: '1.4em',
          letterSpacing: 4
        }
      },
      ICON: {
        style: {
          display: 'inline-block',
          width: 38,
          position: 'absolute',
          top: 1,
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
            selectspace: 18,
            blockspace: 36,
            resultsLeft: '-5%'
          }} />
        </Fragment>
      ),

      temp_simu: ({ isContinued }) => (
        <Fragment>
          <SimuTitle title={'一時預かりシミュレーション'} />
          <TempSimu {...{
            isContinued,
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
          }} />
        </Fragment>
      )
    }

    return ({ abouts, renderDetail }) =>
    <ExLayout>
      {Object.entries(abouts).map(([key, { title, description, backgroundColor }], index) =>
      <Block key={index}>
        <Cover {...a('BG_COLOR', { style: { backgroundColor } })} />
        <Cover {...a('BG_COVER')} />
        <div {...a('WRAP')}>
          <div {...a('TITLE')}>{title}</div>
          <div {...a('DESCRIPTION')}>{description}</div>
        </div>
        <MouseDown listener={() =>
          abouts[key].detail
            ? renderDetail({ elements: abouts[key].detail })
            : renderDetail({ Component: simulations[key] })
        } />
      </Block>
      )}
    </ExLayout>

  })(Atra({
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
  })),

  Detail: (a =>
    ({ elements, Component, isContinued }) =>
    
    Boolean(elements)

      ? <div {...a('ROOT', {
        className: 'markdown-body',
        style: {
          margin: '0px 20px'
        }
      })}>
        {elements}
      </div>

      : <div {...a('ROOT', {
        style: {
          marginTop: 40,
          marginBottom: 60
        }
      })}>
        <Component {...{ isContinued }} />
      </div>

  )(Atra({
    ROOT: {
      style: {
        fontSize: '1.3em',
        color: 'rgb(72, 72, 72)',
        letterSpacing: 2
      }
    }
  }))

}))