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
        ages: [MIN_FEE],
        day: 2,
        time: 6,
        morning: 0,
        night: 0,
        sunday: 0
      },
      results: null
    }

    this.listeners = {
      onChange: createOnChange(this),
      onClick: createOnClick(this)
    }
  }

  render() {
    const { selects, results } = this.state
    const { onChange, onClick } = this.listeners
    const resultable = Boolean(results)
    return (
      <div style={rootStyle}>
        <div style={titleDivStyle}>{title}</div>
        <RightUp {...{ selects, onChange, onClick, buttonable: !resultable }} />
        {resultable && <LeftDown {...{ results }} />}
      </div>
    )
  }
}

const createOnChange = react => e => {
  const name = e.target.dataset.name
  const changedValue = +e.target.value

  const { selects } = react.state

  if (name === 'ages') {
    selects.ages[+e.target.dataset.ageIndex] = changedValue
  } else {
    selects[name] = changedValue
  }

  selects.ages = name === 'number'
    ? [...peopleLengthGenerator(changedValue)]
    : selects.ages

  react.setState({ selects, results: null })
}

const createOnClick = react => () => {
  const { selects } = react.state

  const ages = [].concat(selects.ages)
  const children = ages.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const results = creators.map(fn => fn(children, selects))

  react.setState({ results: results.filter(result => result) })
}

const creators = [
  children => ({
    name: '入園料',
    half_price: children.length > 1,
    fees: children.map((child, index) =>
      children.length > 1 && index === 0
      ? 5000 / 2
      : 5000
    )
  }),
  (children, { day, time }) => ({
    name: '保育料',
    half_price: children.length > 1,
    fees: children.map((child, index) => {
      const fee = child + day * 2000 + time * 2000
      return children.length > 1 && index === 0
        ? fee / 2
        : fee
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
