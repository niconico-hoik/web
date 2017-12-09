import React from 'react'
import Atra from 'atra'

export default ({ results }) =>
  <div {...a('left_wrap')}>
    <Total {...{ results }} />
    {results.map((result, key) => <Result {...{ key, result }} />)}
  </div>

// if (!results.length) return false
const Total = ({ results }) => {
  const total = results
    .map(({ fees }) => fees.reduce((pre, cur) => pre + cur))
    .reduce((pre, cur) => pre + cur)
    
  return (
    <div {...a('result_total')}>
      <span>{`合計 ￥${total}`}</span>
      <span {...a('result_alert')}>{`(価格は税抜き)`}</span>
    </div>
  )
}

const Result = ({ result }) => {
  const { name, fees, half_price } = result
  const total = fees.reduce((pre, cur) => pre + cur)
  const feesOptimized =
    fees.length < 2
      ? []
      : fees.map((fee, index) =>
          index === 0
            ? half_price ? `￥${fee}(半額)` : `￥${fee}`
            : ` + ￥${fee}`
        )

  return (
    <div {...a('result_wrap')}>
      <div>{`${name} ￥${total}`}</div>
      <div>{feesOptimized.map((fee, key) => <FeeDetail {...{ key, fee }} />)}</div>
    </div>
  )
}

const FeeDetail = ({ fee }) => <span {...a('mini_span')}>{fee}</span>

const a = Atra({

  left_wrap: {
    style: {
      marginTop: 90,
      // marginLeft:24,
      textAlign: 'left',
      fontSize: 54
    }
  },

  result_total: {
    style: {
      marginTop: 18
    }
  },

  result_alert: {
    style: {
      fontSize: '0.4em',
      marginLeft: 20,
      verticalAlign: 'middle'
    }
  },

  result_wrap: {
    style: {
      fontSize: '0.58em',
      marginTop: 18
    }
  },

  mini_span: {
    style: {
      fontSize: '0.85em',
      verticalAlign: 'super'
    }
  }
})
