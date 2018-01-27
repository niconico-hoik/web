import React from 'react'
import { Question as Button } from 'lonogara-tool/button'
import { Domestic } from './components.jsx'
import fetchToReact from './fetchToReact.js'

export default (hoComponents) => ({
  head: 'ご利用について',
  Button,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const { Exhibit, Detail } = hoComponents()

    const abouts = {
      month: {
        title: '月極保育',
        description: '持ち物や料金体系について',
        backgroundColor: 'rgb(175, 196, 72)',
        detail: await fetchToReact('./post/month.html')
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
        detail: await fetchToReact('./post/temp.html')
      },
      temp_simu: {
        title: '一時預かりシミュレーション',
        description: 'ケースに応じた実際の料金を算出頂けます',
        backgroundColor: 'rgb(117, 104, 182)'
      }
    }

    return {
      Exhibit: () =>
        <Domestic>
          <Exhibit {...{ abouts, renderDetail }} />
        </Domestic>,

      Detail: (props) =>
        <Domestic>
          <Detail {...{ abouts, customProps: props }} />
        </Domestic>
    }
  }
})