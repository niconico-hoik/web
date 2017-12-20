import React from 'react'
import { House as Button } from 'lonogara-tool/button'
// import Exhibit from './Exhibit.jsx'
// import Detail from './Detail.jsx'

const head = 'Home'

const create = async ({ renderDetail, setPopdown, setInform }) => {
  await setInform(1)
  return {
    Exhibit: () => <div />,
    Detail: () => <div />
  }
}

export default { head, Button, create }
