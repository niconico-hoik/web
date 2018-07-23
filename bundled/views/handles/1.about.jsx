import React from 'react'
import { Question as Button } from 'lonogara-sdk/button'
import { f2r, Domestic } from './util.js'

const HighOrderExhibit = ({ Exhibit, renderDetail }) =>
  Promise.all([
    f2r('./post/month.html'),
    f2r('./post/temp.html')
  ])
  .then((details) => ({
    month: {
      title: '月極保育',
      description: '持ち物や料金体系について',
      backgroundColor: 'rgb(175, 196, 72)',
      detail: details[0]
    },
    month_simu: {
      title: '月極保育シミュレーション',
      description: 'ケースに応じた実際の料金を算出頂けます',
      backgroundColor: 'rgb(108, 184, 64)'
    },
    temp: {
      title: '一時預かり',
      description: '持ち物や料金体系について',
      backgroundColor: 'rgb(90, 147, 190)',
      detail: details[1]
    },
    temp_simu: {
      title: '一時預かりシミュレーション',
      description: 'ケースに応じた実際の料金を算出頂けます',
      backgroundColor: 'rgb(117, 104, 182)'
    }
  }))
  .then(abouts =>
    () =>
    <Domestic>
      <Exhibit {...{ abouts, renderDetail }} />
    </Domestic>
  )

export default ({ Exhibit, Detail }) => ({

  head: 'ご利用について',

  Button,

  create: async ({ renderDetail, setPopdown, setInform }) => ({

    Exhibit: await HighOrderExhibit({ Exhibit, renderDetail }),

    Detail: ({ data, isContinued }) =>
    <Domestic>
      <Detail {...{
        elements: data.elements,
        simulationKey: data.simulationKey,
        isContinued
      }} />
    </Domestic>

  })
})