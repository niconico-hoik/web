// @flow
import React from 'react'
import Store from './Store.js'
import Atra from 'atra'
import { monthEntry, monthCare, monthSundry, monthSpecialTime } from 'nicohoi-price-api'
import { numToArr, scrape, sum, SELECT_COLOR } from './util.js'
import {
  Space,
  FontInline,
  Vertical,
  Relative,
  RelativeInline,
  Select,
  TotalWithoutTax,
  Results,
  ResultDetails
} from './components.jsx'

const DAY_INIT = 2
const TIME_INIT = 6

const NUMBER_OPTIONS = numToArr(4).map((n, index) =>
  <option key={index} {...{ value: index + 1, children: index + 1 }} />
)

const AGES_OPTIONS = [
  { value: 'infant', children: '2才以下' },
  { value: 'toddler', children: '3才以上' }
].map(({ value, children }, index) =>
  <option key={index} {...{ value, children }} />
)

const DAY_OPTIONS = numToArr(5).map((value, index) => {
  const both = DAY_INIT + index
  return <option key={index} {...{ value: both, children: both }} />
})

const TIME_OPTIONS = numToArr(5).map((value, index) => {
  const both = TIME_INIT + index
  return <option key={index} {...{ value: both, children: both }} />
})

const SPECIAL_OPTIONS = [
  { value: 0, children: '含まない' },
  { value: 1, children: '含む' }
].map(({ value, children }, index) =>
  <option key={index} {...{ value, children }} />
)

const store = Store({
  ages: ['toddler'],
  day: DAY_INIT,
  time: TIME_INIT,
  morning: 0,
  night: 0,
  sunday: 0
})

const listeners = store.order()

export default class MonthSimu extends React.Component {

  constructor(props) {
    super(props)
    store.attach(this, { inherit: props.isContinued })
    this.spaces = {
      blockspace: <Space size={props.blockspace} />,
      selectspace: <Space size={props.selectspace} />
    }
  }

  componentWillUnmount() {
    store.detach()
  }

  render() {
    const { blockspace, selectspace } = this.spaces
    const results = createResults(this.state)
    const totalPrice = sum(results.map(({ prices }) => prices.length ? sum(prices) : 0))

    return (
      <div {...{ style: { textAlign: 'center' } }}>

        <div>
          <div>{this.SelectNumber()}{'人のお子さま'}</div>
          {selectspace}
          <div>{'('}{this.state.ages.map((value, index) => this.SelectAge(value, index))}{')を'}</div>
          {selectspace}
          <div>{'週に'}{this.SelectDay()}{'日の'}</div>
          {selectspace}
          <div>{'1日に'}{this.SelectTime()}{'時間'}</div>
          {selectspace}
          <div>{'7:00~8:00を'}{this.SelectSpecialTime('morning')}</div>
          {selectspace}
          <div>{'18:00以降を'}{this.SelectSpecialTime('night')}</div>
          {selectspace}
          <div>{'日曜日を'}{this.SelectSpecialTime('sunday')}</div>
        </div>

        {blockspace}

        <div>
          <TotalWithoutTax total={totalPrice} />
          <Results left={this.props.resultsLeft} children={results.map(({ string, prices, isHalfOne }, index) =>
            <Relative key={index}>

              {blockspace}

              <Result {...{ string, prices }} />

              {prices.length > 1 && <ResultDetails left={0} children={prices.map((price, index) =>
                <span key={index}>
                  {index !== 0 && ' + '}
                  {`￥${price}`}
                  {isHalfOne && index === 0 && '(半額)'}
                </span>
              )} />}

            </Relative>
          )} />
        </div>

      </div>
    )
  }

  SelectNumber() {
    return (
      <Select {...{
        onChange: listeners['NUMBER_ON_CHANGE'],
        value: this.state.ages.length,
        color: SELECT_COLOR
      }}>
        {NUMBER_OPTIONS}
      </Select>
    )
  }

  SelectAge(ageValue, ageIndex) {
    return (
      <span key={ageIndex}>
        {ageIndex !== 0 && 'と'}
        <Select {...{
          onChange: listeners['AGE_ON_CHANGE'],
          value: ageValue,
          dataset: { 'age-index': ageIndex },
          color: SELECT_COLOR
        }}>
          {AGES_OPTIONS}
        </Select>
      </span>
    )
  }

  SelectDay() {
    return (
      <Select {...{
        onChange: listeners['VALUE_ON_CHANGE'],
        value: this.state.day,
        dataset: { name: 'day' },
        color: SELECT_COLOR
      }}>
        {DAY_OPTIONS}
      </Select>
    )
  }

  SelectTime() {
    return (
      <Select {...{
        onChange: listeners['VALUE_ON_CHANGE'],
        value: this.state.time,
        dataset: { name: 'time' },
        color: SELECT_COLOR
      }}>
        {TIME_OPTIONS}
      </Select>
    )
  }

  SelectSpecialTime(name) {
    return (
      <Select {...{
        onChange: listeners['VALUE_ON_CHANGE'],
        value: this.state[name],
        dataset: { name },
        color: SELECT_COLOR
      }}>
        {SPECIAL_OPTIONS}
      </Select>
    )
  }
}

const createResults = ({
  ages,
  day,
  time,
  morning,
  night,
  sunday
}) => {

  ages = [].concat(ages).sort((p, c) => p === 'toddler' ? -1 : 1)
  const isHalfOne = ages.length > 1
  const pricesSpecialTime = ages.map(() => monthSpecialTime())

  return [
    {
      string: '入園料',
      isHalfOne,
      prices: ages.map((n, index) => monthEntry() / (isHalfOne && index === 0 ? 2 : 1))
    },
    {
      string: '保育料',
      isHalfOne,
      prices: ages.map((age, index) => monthCare(age, day, time) / (isHalfOne && index === 0 ? 2 : 1))
    },
    {
      string: '諸経費',
      prices: ages.map(() => monthSundry())
    },
    {
      string: '早朝料金',
      prices: morning ? pricesSpecialTime : []
    },
    {
      string: '夜間料金',
      prices: night ? pricesSpecialTime : []
    },
    {
      string: '日曜料金',
      prices: sunday ? pricesSpecialTime : []
    }
  ]
}

const Result = ({ string, prices }) =>
  <span>
    <RelativeInline>
      <FontInline size={'0.75em'}>
        <Vertical align={'middle'}>
          {string.length < 4 && <span {...{ style: { visibility: 'hidden' } }}>{'漢'}</span>}
          {`${string}:`}
        </Vertical>
      </FontInline>
    </RelativeInline>
    <span>{' '}</span>
    <Vertical align={'middle'}>
      {`￥${prices.length ? sum(prices) : 0}`}
    </Vertical>
  </span>