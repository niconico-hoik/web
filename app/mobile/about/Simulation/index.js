import React from 'react'
import Title from './Title.jsx'
import RightUp from './Rightup.jsx'
import LeftDown from './Leftdown.jsx'

const MIN_FEE = 8000
const title = <Title />
const rootStyle = {
  position: 'relative',
  fontSize: 42
}
const titleDivStyle = {
  textAlign: 'right',
  marginTop: 140
}

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selects: {
        number: 1,
        age: [MIN_FEE],
        day: 2,
        time: 6,
        morning: 0,
        night: 0,
        sunday: 0
      },
      results: []
    }

    this.listeners = {
      onChange: createOnChange(this),
      onClick: createOnClick(this)
    }
  }

  render() {
    const { selects, results } = this.state
    const { onChange, onClick } = this.listeners
    const resulting = results.length !== 0

    return (
      <div style={rootStyle}>
        <div style={titleDivStyle}>{title}</div>
        <RightUp {...{ selects, resulting, onChange, onClick }} />
        {resulting && <LeftDown {...{ results }} />}
      </div>
    )
  }
}

const createOnChange = react => e => {
  const { name } = e.target.dataset
  const value = +e.target.value

  const { selects } = react.state

  if (name === 'age') {
    const ageIndex = +e.target.dataset.index
    selects.age[ageIndex] = value
  } else {
    selects[name] = value
    if (name === 'number') {
      selects.age = [...peopleLengthGenerator(value)]
    }
  }

  react.setState({ selects, results: [] })
}

const createOnClick = react => () => {
  const { selects } = react.state
  const children = []
    .concat(selects.age)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const results = creators
    .map(fn => fn(children, selects))
    .filter(result => result)
  react.setState({ results })
}

const creators = [
  children => ({
    name: '入園料',
    half_price: children.length > 1,
    fees: children.map(
      (child, index) => (children.length > 1 && index === 0 ? 5000 / 2 : 5000)
    )
  }),
  (children, { day, time }) => ({
    name: '保育料',
    half_price: children.length > 1,
    fees: children.map((child, index) => {
      const fee = child + day * 2000 + time * 2000
      return children.length > 1 && index === 0 ? fee / 2 : fee
    })
  }),
  (children, { morning }) =>
    morning && {
      name: '早朝料金',
      fees: children.map(() => 3000)
    },
  (children, { night }) =>
    night && {
      name: '夜間料金',
      fees: children.map(() => 3000)
    },
  (children, { sunday }) =>
    sunday && {
      name: '日曜料金',
      fees: children.map(() => 3000)
    },
  children => ({
    name: '諸経費',
    fees: children.map(() => 200)
  })
]

const peopleLengthGenerator = function*(length) {
  let from = 0
  while (from < length) {
    yield MIN_FEE
    from++
  }
}
