import React from 'react'
import { House as Button } from 'lonogara-sdk/button'
import { Domestic } from './Wrap.jsx'
import { f2r } from './util.js'

const HighOrderExhibit = ({ Exhibit, renderDetail }) => {
  const informations = {
    name: 'ニコニコ保育園 和泉中央園',
    postal: '〒594-1105',
    address: '大阪府和泉市のぞみ野三丁目1237-58',
    building: 'Shima.B.L.D.G 1F',
    tel: '0725-56-3396'
  }

  return () =>
  <Domestic>
    <Exhibit {...{ informations, renderDetail }} />
  </Domestic>
}

const HighOrderDetail = ({ Detail }) =>
  f2r('./post/preview.html').then(preview =>
    () =>
    <Domestic>
      <Detail {...{ preview }} />
    </Domestic>
  )

export default ({ Exhibit, Detail }) => ({

  head: '',

  Button,

  create: async ({ renderDetail, setPopdown, setInform }) => ({

    Exhibit: HighOrderExhibit({ Exhibit, renderDetail }),

    Detail: await HighOrderDetail({ Detail })

  })
})