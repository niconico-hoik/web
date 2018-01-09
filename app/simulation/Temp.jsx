// @flow
import React from 'react'
import Atra from 'atra'
import { TempCare, tempAllday } from 'nicohoi-price-api'
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

const ALL_DAY_COLOR = 'rgb(39, 165, 74)'
const NIGHT_COLOR = '#ff6060'
const NUMBER_LENGTH = 4
const AGES_OPTIONS = [
  { value: 'toddler', children: '小学以下' },
  { value: 'lower', children: '小学低学年' },
  { value: 'higher', children: '小学高学年' }
]

function* ftOptionsG(from, to) {
  while (from <= to) {
    yield from
    from+=0.5
  }
}

const ftOptions = ({ from, to }) => [...ftOptionsG(from, to)]

const timenize = (num) => {
  const [hour,half] = String(num).split('.')
  return `${hour}:${half ? 3 : 0}0`
}

const colorOfFrom = (value) =>
  value === 9 ? ALL_DAY_COLOR
  : value > 20 ? NIGHT_COLOR
  : SELECT_COLOR

const colorOfTo = (value) =>
  value === 17 ? ALL_DAY_COLOR
  : value > 20 ? NIGHT_COLOR
  : SELECT_COLOR

const createResults = ({ times, pricesByTime, badges }) => [
  {
    string: '7:00~',
    time: times.morning || 0,
    prices: scrape(pricesByTime.map(({ morning }) => morning))
  },
  {
    string: '8:00~',
    time: times.day || 0,
    prices: scrape(pricesByTime.map(({ day }) => day)),
    badge: badges.day
  },
  {
    string: '18:00~',
    time: times.evening || 0,
    prices: scrape(pricesByTime.map(({ evening }) => evening))
  },
  {
    string: '20:00~',
    time: times.night || 0,
    prices: scrape(pricesByTime.map(({ night }) => night)),
    badge: badges.night
  }
]

const prepareAllday = ({ from, to, ages, badges }) =>
  from === 9 && to === 17 && {
    totalPrice: sum(ages.map((age) => tempAllday(age))),
    results: createResults({
      times: { day: 8 },
      pricesByTime: ages.map((age) => ({ day: tempAllday(age) })),
      badges: { day: badges.day }
    })
  }

const prepare = ({ from, to, ages, badges }) => {

  const care = new TempCare(from, to)

  return {
    totalPrice: sum(ages.map((age) => care.price(age))),
    results: createResults({
      times: care.timeByTime(),
      pricesByTime: ages.map((age) => care.priceByTime(age)),
      badges: { night: to > 20 && badges.night }
    })
  }
}

export default class TempSimu extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      ages: ['toddler'],
      from: 10,
      to: 19.5
    }

    this.spaces = {
      blockspace: <Space size={props.blockspace} />,
      selectspace: <Space size={props.selectspace} />
    }

    this.badges = {
      day: <span {...{
        style: Object.assign({}, props.badgeStyle, { backgroundColor: ALL_DAY_COLOR }),
        children: '1日保育パック'
      }} />,
      night: <span {...{
        style: Object.assign({}, props.badgeStyle, { backgroundColor: NIGHT_COLOR }),
        children: '前日までに要予約'
      }} />
    }

    this.numberOnChange = (e) => {
      const agesLength = +e.target.value
      const ages = numToArr(agesLength).map((n, index) => this.state.ages[index] || 'toddler')
      this.setState({ ages })
    }

    this.ageOnChange = (e) => {
      const ages = [].concat(this.state.ages)
      const ageIndex = +e.target.dataset.ageIndex
      const ageValue = e.target.value
      ages[ageIndex] = ageValue
      this.setState({ ages })
    }

    this.fromtoOnChange = (e) => {
      const from_or_to = e.target.dataset.name
      const time = +e.target.value
      this.setState({ [from_or_to]: time })
    }
  }

  render() {
    const { from, to, ages } = this.state
    const prepareOpts = { from, to, ages, badges: this.badges }
    const { totalPrice, results } = prepareAllday(prepareOpts) || prepare(prepareOpts)
    const { blockspace, selectspace } = this.spaces

    return (
      <div {...{ style: { textAlign: 'center' } }}>

        <div>
          <div>{this.SelectNumber()}{'人のお子さま'}</div>
          {selectspace}
          <div>{'('}{this.state.ages.map((value, index) => this.SelectAge(value, index))}{')を'}</div>
          {selectspace}
          <div>{this.SelectFrom()}{'から'}{this.SelectTo()}{'まで'}</div>
        </div>

        {blockspace}

        <div>
          <TotalWithoutTax total={totalPrice} />
          <Results left={this.props.resultsLeft} children={results.map(({ string, prices, badge, time }, index) =>
            <Relative key={index}>

              {blockspace}

              <Result {...{ string, prices, badge, time }} />

              {prices.length > 1 && <ResultDetails right={0} children={prices.map((price, index) =>
                <span key={index}>
                  {index !== 0 && ' + '}
                  {`￥${price}`}
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
        onChange: this.numberOnChange,
        value: this.state.ages.length,
        color: SELECT_COLOR
      }}>
      {numToArr(NUMBER_LENGTH).map((n, index) =>
        <option key={index} {...{ value: index + 1, children: index + 1 }} />
      )}
      </Select>
    )
  }

  SelectAge(ageValue, ageIndex) {
    return (
      <span key={ageIndex}>
        {ageIndex !== 0 && 'と'}
        <Select {...{
          onChange: this.ageOnChange,
          value: ageValue,
          dataset: { 'age-index': ageIndex },
          color: SELECT_COLOR
        }}>
        {AGES_OPTIONS.map(({ value, children }, index) =>
          <option key={index} {...{ value, children }} />
        )}
        </Select>
      </span>
    )
  }

  SelectFrom() {
    const { from, to } = this.state
    return (
      <Select {...{
        onChange: this.fromtoOnChange,
        value: from,
        dataset: { name: 'from' },
        color: colorOfFrom(from)
      }}>
      {ftOptions({ from: 7, to: to - 0.5 }).map((value, index) =>
        <option key={index} {...{
          value,
          children: timenize(value),
          style: { color: colorOfFrom(value) }
        }} />
      )}
      </Select>
    )
  }

  SelectTo() {
    const { from, to } = this.state
    return (
      <Select {...{
        onChange: this.fromtoOnChange,
        value: to,
        dataset: { name: 'to' },
        color: colorOfTo(to)
      }}>
      {ftOptions({ from: from + 0.5, to: 23 }).map((value, index) =>
        <option key={index} {...{
          value,
          children: timenize(value),
          style: { color:  colorOfTo(value) }
        }} />
      )}
      </Select>
    )
  }
}

export const Result = ({ string, prices, badge, time }) =>
  <span>
    <RelativeInline>
      <FontInline size={'0.75em'}>
        <Vertical align={'middle'}>
          {string.length < 6 && <span {...{ style: { visibility: 'hidden' } }}>{'0'}</span>}
          {`${string}:`}
          {badge}
        </Vertical>
      </FontInline>
    </RelativeInline>
    <span>{' '}</span>
    <Vertical align={'middle'}>
      {`￥${prices.length ? sum(prices) : 0}`}
    </Vertical>
    {time > 0 &&
    <FontInline size={'0.7em'}>
      <Vertical align={'middle'}>
        {` (${time}時間分)`}
      </Vertical>
    </FontInline>}
  </span>