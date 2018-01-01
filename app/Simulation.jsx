import React from 'react'
import Atra from 'atra'
import { IconSimulate } from './Icons.jsx'
import { numToArr } from './util.js'

const TITLE = '月極料金シミュレーション'
const ICON = <IconSimulate />
const MIN_FEE = 8000
const initSelects = () => ({
  number: 1,
  ages: [MIN_FEE],
  day: 2,
  time: 6,
  morning: 0,
  night: 0,
  sunday: 0
})

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.state.selects = initSelects()
    this.state.results = reResults(this.state.selects)

    this.a = Atra(props.style)

    this.onChange = (e) => {
      const selects = reSelects({
        prevSelects: this.state.selects,
        changedName: e.target.dataset.name,
        changedValue: +e.target.value,
        ageIndex: +e.target.dataset.ageIndex
      })

      const results = reResults(selects)

      this.setState({ selects, results })
    }
  }

  render() {
    const { a } = this

    return (
      <div {...a('ROOT')}>
        <div {...a('TITLE')}>
          <span {...a('TITLE_STRING')}>{TITLE}</span>
          <span {...a('TITLE_ICON')}>{ICON}</span>
        </div>
        <div {...a('SELECTS')}>
          {this.createSelects()}
        </div>
        <div>
          {this.createTotal()}
          {this.createResults()}
        </div>
      </div>
    )
  }

  createSelects(){
    return Object.entries(this.state.selects).map(
      ([selectName,selectValue]) => Array.isArray(selectValue)

        ? this.createAges({ selectName, ages: selectValue })

        : <Select key={selectName} {...{
          beforeText: templates[selectName].before,
          onChange: this.onChange,
          selectName,
          selectValue,
          options: templates[selectName].options,
          afterText: templates[selectName].after
        }} />
    )
  }

  createAges({ selectName, ages }) {

    const { before, after, beforeExZero, afterExLast, options } = templates.ages

    return (
      <div key={selectName} {...{ style: { marginTop: 18 } }}>
        {ages.map((selectValue, agesIndex) =>
          <Age key={agesIndex} {...{
            beforeText: ages.length > 1 && agesIndex !== 0 ? beforeExZero : before,
            onChange: this.onChange,
            selectName,
            selectValue,
            agesIndex,
            options,
            afterText: ages.length > 1 && agesIndex !== ages.length - 1 ? afterExLast : after
          }} />
        )}
      </div>
    )
  }

  createTotal() {
    const total = this.state.results.map(({ fees }) => fees.reduce((p, c) => p + c)).reduce((p, c) => p + c)
    return <Total {...{ total }} />
  }

  createResults() {
    return this.state.results.map(
      ({ name, fees, half_price }, index) => {
        const total = fees.reduce((p, c) => p + c)
        return <Result key={index} {...{ name, total }}>
          {fees.length >= 2 && this.createDetails({ fees, half_price })}
        </Result>
      }
    )
  }

  createDetails({ fees, half_price }) {
    return <div {...this.a('RESULT_DETAILS')}>
      {fees.map((fee, index) => <Detail key={index} {...{ fee, index, half_price }} />)}
    </div>
  }
}

const templates = {
  number: {
    before: '',
    options: [
      { value: 1, children: 1 },
      { value: 2, children: 2 },
      { value: 3, children: 3 },
      { value: 4, children: 4 }
    ],
    after: '人のお子さま'
  },
  ages: {
    before: '(',
    beforeExZero: '',
    options: [
      { value: MIN_FEE, children: '3才以上' },
      { value: 11000, children: '2才以下' }
    ],
    afterExLast: ' と',
    after: ') を'
  },
  day: {
    before: '週に',
    options: [
      { value: 2, children: 2 },
      { value: 3, children: 3 },
      { value: 4, children: 4 },
      { value: 5, children: 5 },
      { value: 6, children: 6 }
    ],
    after: '日の'
  },
  time: {
    before: '1日に',
    options: [
      { value: 6, children: 6 },
      { value: 7, children: 7 },
      { value: 8, children: 8 },
      { value: 9, children: 9 },
      { value: 10, children: 10 }
    ],
    after: '時間'
  },
  morning: {
    before: '7:00~8:00を',
    options: [
      { value: 0, children: '含まない' },
      { value: 1, children: '含む' }
    ],
    after: ''
  },
  night: {
    before: '18:00以降を',
    options: [
      { value: 0, children: '含まない' },
      { value: 1, children: '含む' }
    ],
    after: ''
  },
  sunday: {
    before: '日曜日を',
    options: [
      { value: 0, children: '含まない' },
      { value: 1, children: '含む' }
    ],
    after: ''
  }
}

const reSelects = ({ prevSelects, changedName, changedValue, ageIndex }) => {

  const selects = {}

  if (changedName === 'ages') {
    selects.ages = [].concat(prevSelects.ages)
    selects.ages[ageIndex] = changedValue
  } else {
    selects[changedName] = changedValue
  }

  if(changedName === 'number'){
    selects.ages = numToArr(changedValue).map(() => MIN_FEE)
  }

  return Object.assign({}, prevSelects, selects)
}

const reResults = (selects) => {
  const children = [].concat(selects.ages).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const results = calculators.map(fn => fn(children, selects)).filter(result => result)
  return results
}

const calculators = [

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

  children => ({
    name: '入園料',
    half_price: children.length > 1,
    fees: children.map((child, index) =>
      children.length > 1 && index === 0
      ? 5000 / 2
      : 5000
    )
  }),

  children => ({
    name: '諸経費',
    fees: children.map(() => 200)
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
    }

]

const Select = (a =>

  ({
    beforeText,
    onChange,
    selectValue,
    selectName,
    options,
    afterText
  }) =>
    <div {...a('SELECT_ROOT')}>
      <span>{beforeText}</span>
      <select {...a('SELECT', {
        onChange,
        value: selectValue,
        'data-name': selectName
      })}>
        {options.map(({ value, children }) => <option key={value} {...{ children, value }} />)}
      </select>
      <span>{afterText}</span>
    </div>

)(Atra({
  SELECT_ROOT: {
    style: {
      marginTop: 18
    }
  },
  SELECT: {
    style: {
      fontSize: 'inherit',
      textAlign: 'right',
      paddingLeft: 15,
      paddingRight: 10,
      borderStyle: 'none',
      color: 'rgb(76, 97, 135)',
      background: 'rgba(0,0,0,0)'
    }
  }
}))

const Age = (a =>

  ({
    beforeText,
    onChange,
    selectValue,
    selectName,
    agesIndex,
    options,
    afterText
  }) =>
    <span>
      <span>{beforeText}</span>
      <select {...a('SELECT', {
        onChange,
        value: selectValue,
        'data-name': selectName,
        'data-age-index': agesIndex
      })}>
        {options.map(({ value, children }) => <option key={value} {...{ children, value }} />)}
      </select>
      <span>{afterText}</span>
    </span>

)(Atra({
  SELECT: {
    style: {
      fontSize: 'inherit',
      textAlign: 'right',
      paddingLeft: 15,
      paddingRight: 10,
      borderStyle: 'none',
      color: 'rgb(76, 97, 135)',
      background: 'rgba(0,0,0,0)'
    }
  }
}))

const Total = (a =>

  ({ total }) =>
    <div>
      <span {...a('TOTAL')}>{`合計 ￥${total}`}</span>
      <span {...a('NO_TAX')}>{`(税抜き)`}</span>
    </div>

)(Atra({
  TOTAL: {
    style: {
      fontSize: '1.2em'
    }
  },
  NO_TAX: {
    style: {
      position: 'relative',
      top: -3,
      marginLeft: 8,
      fontSize: '0.6em'
    }
  },
}))

const Result = (a =>

  ({ name, total, children }) =>
    <div {...a('RESULT_ROOT')}>
      <div>{`${name} ￥${total}`}</div>
      {children}
    </div>


)(Atra({
  RESULT_ROOT: {
    style: {
      fontSize: '0.8em',
      marginTop: 18
    }
  }
}))

const Detail = (a =>

  ({ fee, index, half_price }) => {
    const text = index !== 0
      ? ` + ￥${fee}`
      : half_price
      ? `￥${fee}(半額)`
      : `￥${fee}`

    return <span {...a('FEE_DETAIL')}>{text}</span>
  }

)(Atra({
  FEE_DETAIL: {
    style: {
      fontSize: '0.85em',
      verticalAlign: 'super'
    }
  }
}))