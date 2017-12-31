// @flow
import React from 'react'
import Atra from 'atra'
import { About } from '../view'
import Simulation from '../Simulation.jsx'
import { ExLayout, Block, Cover, MouseDown } from './components.jsx'

const simulation = <Simulation />

export default About(({
  details,
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

    const [detail, addition] = key === 'simu'
    ? [simulation, {
      style: {
        marginTop: 40,
        marginBottom: 60
      }
    }]
    : [details[key], {
      className: 'markdown-body',
      style: {
        margin: '0px 20px'
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

const abouts = {
  month: {
    title: '月極預かり',
    description: '持ち物や料金体系について',
    backgroundColor: 'rgb(175, 196, 72)'
  },
  simu: {
    title: '月極料金シミュレーション',
    description: 'ケースに応じた実際の料金を算出頂けます',
    backgroundColor: 'rgb(108, 184, 64)'
  },
  infant: {
    title: '一時預かり',
    description: '持ち物や料金体系について',
    backgroundColor: 'rgb(90, 147, 190)'
  },
  school: {
    title: '一時預かり(小学生以上)',
    description: '通常の一時預かり(幼児)との違いについて',
    backgroundColor: 'rgb(117, 104, 182)'
  }
}