import React from 'react'
import { Question as Button } from 'lonogara-sdk/button'
import { Domestic } from './Wrap.jsx'
import fetchToReact from './fetchToReact.js'

export default ({ Exhibit, Detail }) => ({
  head: 'ご利用について',
  Button,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    abouts.month.detail = await fetchToReact('./post/month.html')
    abouts.temp.detail = await fetchToReact('./post/temp.html')

    return {
      Exhibit: () =>
        <Domestic>
          <Exhibit {...{
            abouts,
            renderDetail
          }} />
        </Domestic>,

      Detail: ({ data, isContinued }) =>
        <Domestic>
          <Detail {...{
            elements: data.elements,
            simulationKey: data.simulationKey,
            isContinued
          }} />
        </Domestic>
    }
  }
})

const abouts = {
  month: {
    title: '月極保育',
    description: '持ち物や料金体系について',
    backgroundColor: 'rgb(175, 196, 72)'
  },
  month_simu: {
    title: '月極保育シミュレーション',
    description: 'ケースに応じた実際の料金を算出頂けます',
    backgroundColor: 'rgb(108, 184, 64)'
  },
  temp: {
    title: '一時預かり',
    description: '持ち物や料金体系について',
    backgroundColor: 'rgb(90, 147, 190)'
  },
  temp_simu: {
    title: '一時預かりシミュレーション',
    description: 'ケースに応じた実際の料金を算出頂けます',
    backgroundColor: 'rgb(117, 104, 182)'
  }
}