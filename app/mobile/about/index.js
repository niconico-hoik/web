import React from 'react'
import { Question as Button } from 'lonogara-tool/button'
import { internalHtml } from 'lonogara-tool/toreact'
import Summary from './Summary.jsx'
import Detail from './Detail.jsx'
import Simulation from './Simulation'

const head = 'About'

const create = async ({ renderDetail, setPopdown, setInform }) => {
  const details = {
    about: await fetchToReact('./post/about.html'),
    month: await fetchToReact('./post/month.html'),
    simu: <Simulation />,
    infant: await fetchToReact('./post/day.infant.html'),
    school: await fetchToReact('./post/day.school.html')
  }

  return {
    Exhibit: () =>
      Object.keys(summaries).map(key => {
        const { backgroundColor, title, description } = summaries[key]
        return (
          <Summary
            {...{
              key,
              backgroundColor,
              title,
              description,
              onClick: () => renderDetail(key)
            }}
          />
        )
      }),

    Detail: ({ data }) => <Detail {...{ contents: details[data] }} />
  }
}

const fetchToReact = src =>
  fetch(src)
    .then(res => res.text())
    .then(html => internalHtml(html))

const summaries = {
  about: {
    backgroundColor: 'rgb(255, 86, 86)',
    title: '当園について',
    description: '日常の様子などを紹介します'
  },
  month: {
    backgroundColor: 'rgb(146, 231, 74)',
    title: '月極預かり',
    description: '持ち物や料金体系について'
  },
  simu: {
    backgroundColor: 'rgb(60, 229, 117)',
    title: '月極料金シミュレーション',
    description: 'ケースに応じた実際の料金を算出頂けます'
  },
  infant: {
    backgroundColor: 'rgb(78, 178, 255)',
    title: '一時預かり',
    description: '持ち物や料金体系について'
  },
  school: {
    backgroundColor: 'rgb(117, 88, 255)',
    title: '一時預かり(小学生以上)',
    description: '通常の一時預かり(幼児)との違いについて'
  }
}

export default { head, Button, create }
