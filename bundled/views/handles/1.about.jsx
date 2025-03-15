import React from 'react'
import { Question as Button } from 'lonogara-sdk/button'
import { f2r, Domestic } from './util.js'

const HighOrderExhibit = async ({ Exhibit, renderDetail }) => {
  const details = await Promise.all([
    f2r('./post/prepaid.html'),
    f2r('./post/postpaid.html'),
  ]).then(details => {
    return {
      prepaid: details[0],
      postpaid: details[1],
    }
  })
  
  const abouts = {
    prepaid: {
      title: '月極保育/プリペイド',
      description: '持ち物や料金体系について',
      backgroundColor: 'rgb(175, 196, 72)',
      detail: details.prepaid,
    },
    /*
    prepaid_simu: {
      title: '月極保育シミュレーション',
      description: 'ケースに応じた実際の料金を算出頂けます',
      backgroundColor: 'rgb(108, 184, 64)',
      unready: true,
    },
    */
    postpaid: {
      title: '一時預かり/ポストペイド',
      description: '持ち物や料金体系について',
      backgroundColor: 'rgb(90, 147, 190)',
      detail: details.postpaid,
    },
    /*
    postpaid_simu: {
      title: '一時預かりシミュレーション',
      description: 'ケースに応じた実際の料金を算出頂けます',
      backgroundColor: 'rgb(117, 104, 182)',
      unready: true,
    },
    */
  }
  
  const props = { abouts, renderDetail }
  
  return () => {
    return <Domestic><Exhibit {...props} /></Domestic>
  }
}

export default ({ Exhibit, Detail }) => ({
  head: 'ご利用について',
  Button,
  create: async ({ renderDetail, setPopdown, setInform }) => {
    return {
      Exhibit: await HighOrderExhibit({
        Exhibit,
        renderDetail,
      }),
      Detail: ({ isContinued, data: { elements, simulationKey } }) => {
        return (
          <Domestic>
            <Detail {...{
              isContinued,
              elements,
              simulationKey,
            }} />
          </Domestic>
        )
      },
    }
  }
})
