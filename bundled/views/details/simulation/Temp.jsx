// @flow
import React from 'react'
import Redam from 'redam'
import actions from './actions.js'
import Atra from 'atra'
import { TempCare, tempAllday, food as foodPrice } from 'niconico-hoik-price'
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

const NUMBER_OPTIONS = numToArr(4).map((n, index) =>
  <option key={index} {...{ value: index + 1, children: index + 1 }} />
)

const AGES_OPTIONS = [
  { value: 'toddler', children: '乳児 / 幼児' },
  { value: 'lower', children: '小学低学年' },
  { value: 'higher', children: '小学高学年' }
].map(({ value, children }, index) =>
  <option key={index} {...{ value, children }} />
)

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

export default Redam(
  ({ isContinued }, prevState) => isContinued ? prevState : {
    ages: ['toddler'],
    from: 10,
    to: 19.5,
    food: 0
  },
  actions,
  class TempSimu extends React.Component {

    constructor(props) {
      super(props)
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
    }

    render() {
      
      const {
        badges,
        spaces: { blockspace, selectspace },
        props: { provided: { state: { from, to, ages, food } } }
      } = this
      
      const foodPrices = numToArr(food).map(() => foodPrice())
      
      const { totalPrice, results } = prepare({ from, to, ages, badges, foodPrices })
      
      return (
        <div {...{ style: { textAlign: 'center' } }}>

          <div>
            <div>{this.SelectNumber()}{'人のお子さま'}</div>
            {selectspace}
            <div>{'('}{ages.map((value, index) => this.SelectAge(value, index))}{')を'}</div>
            {selectspace}
            <div>{this.SelectFrom()}{'から'}{this.SelectTo()}{'まで'}</div>
            {selectspace}
            <div>{'給食を'}{this.SelectFood()}</div>
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
      const { dispatch, state } = this.props.provided
      return (
        <Select {...{
          value: state.ages.length,
          color: SELECT_COLOR,
          onChange: ({ target }) => dispatch('NUMBER_ON_CHANGE', target)
        }}>
          {NUMBER_OPTIONS}
        </Select>
      )
    }

    SelectAge(ageValue, ageIndex) {
      const { dispatch } = this.props.provided
      return (
        <span key={ageIndex}>
          {ageIndex !== 0 && 'と'}
          <Select {...{
            value: ageValue,
            dataset: { 'age-index': ageIndex },
            color: SELECT_COLOR,
            onChange: ({ target }) => dispatch('AGE_ON_CHANGE', target)
          }}>
            {AGES_OPTIONS}
          </Select>
        </span>
      )
    }

    SelectFrom() {
      const { dispatch, state: { from, to } } = this.props.provided
      const color = from > 20 ? NIGHT_COLOR : SELECT_COLOR
      return (
        <Select {...{
          value: from,
          dataset: { name: 'from' },
          color,
          onChange: ({ target }) => dispatch('VALUE_ON_CHANGE', target)
        }}>
        {ftOptions({ from: 7, to: to - 0.5 }).map((value, index) =>
          <option key={index} {...{
            value,
            children: timenize(value),
            style: { color }
          }} />
        )}
        </Select>
      )
    }

    SelectTo() {
      const { dispatch, state: { from, to } } = this.props.provided
      const color = to > 20 ? NIGHT_COLOR : SELECT_COLOR
      return (
        <Select {...{
          value: to,
          dataset: { name: 'to' },
          color,
          onChange: ({ target }) => dispatch('VALUE_ON_CHANGE', target)
        }}>
        {ftOptions({ from: from + 0.5, to: 23 }).map((value, index) =>
          <option key={index} {...{
            value,
            children: timenize(value),
            style: { color }
          }} />
        )}
        </Select>
      )
    }

    SelectFood() {
      const { dispatch, state: { ages, food } } = this.props.provided
      return (
        <Select {...{
          value: food,
          dataset: { name: 'food' },
          color: SELECT_COLOR,
          onChange: ({ target }) => dispatch('VALUE_ON_CHANGE', target)
        }}>
          {numToArr(ages.length + 1).map((a, index, { length }) =>
            <option key={index} {...{
              value: index,
              children: index === 0 ? '利用しない' : length === 2 ? '利用する' : `${index}食分`
            }} />
          )}
        </Select>
      )
    }
  },
  { singleton: true }
)

const prepare = ({ from, to, ages, badges, foodPrices }) => {
  const care = new TempCare(from, to)
  const isAllDayPrice = from >= 9 && to <= 17 && care.price(ages[0]) > tempAllday(ages[0])
  return {
    totalPrice: sum([].concat(
      foodPrices,
      isAllDayPrice
      ? ages.map((age) => tempAllday(age))
      : ages.map((age) => care.price(age))
    )),
    results: createResults({
      times: (
        isAllDayPrice
        ? { day: to - from }
        : care.timeByTime()
      ),
      pricesByTime: (
        isAllDayPrice
        ? ages.map((age) => ({ day: tempAllday(age) }))
        : ages.map((age) => care.priceByTime(age))
      ),
      badges: {
        day: isAllDayPrice && badges.day,
        night: to > 20 && badges.night
      },
      foodPrices
    })
  }
}

const createResults = ({ times, pricesByTime, badges, foodPrices }) => [
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
  },
  {
    string: '給食費',
    time: 0,
    prices: foodPrices
  }
]

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