import React from 'react'
import { Question as Button } from 'lonogara-tool/button'
// import Exhibit from './Exhibit.jsx'
// import Detail from './Detail.jsx'

const head = 'About'

const create = async ({ renderDetail, setPopdown, setInform }) => {
  await setInform(1)
  return {
    Exhibit: () => <div />,
    Detail: () => <div />
  }
}

export default { head, Button, create }
