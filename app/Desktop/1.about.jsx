// @flow
import React from 'react'
import Atra from 'atra'
import { About } from '../view'
import { Month as MonthSimu, Temp as TempSimu } from '../simulation'
import { IconSimulate } from '../Icons.jsx'
import { ExLayout, Block, Cover, MouseDown } from './components.jsx'

export default About(({
  abouts,
  renderDetail,
  setPopdown,
  setInform
}) => ({

  Exhibit: (a => () =>

    <ExLayout>

      {Object.entries(abouts).map(
        ([key, { title, description, backgroundColor }], index) =>

        <Block key={index}>

          <Cover {...a('BG_COLOR', { style: { backgroundColor } })} />

          <Cover {...a('BG_COVER')} />

          <div {...a('WRAP')}>
            <div {...a('TITLE')}>{title}</div>
            <div {...a('DESCRIPTION')}>{description}</div>
          </div>

          <MouseDown listener={() => renderDetail({ key })} />

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

  Detail: (a => ({ data }) => {

    const { key } = data

    const [detail, addition] = abouts[key].detail
    ? [abouts[key].detail, {
      className: 'markdown-body',
      style: {
        margin: '0px 20px'
      }
    }]
    : [nodes[key], {
      style: {
        marginTop: 40,
        marginBottom: 60
      }
    }]

    return <div {...a('ROOT', addition)}>{detail}</div>
  }

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

const nodes = {

  month_simu: (
    <div>
      <SimuTitle title={'月極預かりシミュレーション'} />
      <MonthSimu {...{
        selectspace: 18,
        blockspace: 36,
        resultsLeft: '-5%'
      }} />
    </div>
  ),

  temp_simu: (
    <div>
      <SimuTitle title={'一時預かりシミュレーション'} />
      <TempSimu {...{
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
    </div>
  )
}