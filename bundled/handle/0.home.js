import React from 'react'
import { House as Button } from 'lonogara-tool/button'
import { Domestic } from './components.jsx'
import fetchToReact from './fetchToReact.js'

export default (hoComponents) => ({
  head: '',
  Button,
  create: async ({ renderDetail, setPopdown, setInform }) => {

    const { Exhibit, Detail } = hoComponents()

    const informations = {
      name: 'ニコニコ保育園 和泉中央園',
      postal: '〒594-1105',
      address: '大阪府和泉市のぞみ野三丁目1237-58',
      building: 'Shima.B.L.D.G 1F',
      tel: '0725-56-3396'
    }

    const preview = await fetchToReact('./post/preview.html')

    return {
      Exhibit: () =>
        <Domestic>
          <Exhibit {...{ informations, renderDetail }} />
        </Domestic>,

      Detail: () =>
        <Domestic>
          <Detail {...{ preview }} />
        </Domestic>
    }
  }
})