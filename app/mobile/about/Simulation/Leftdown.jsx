import React from 'react'
import Atra from 'atra'

export default ({ results }) =>
  <div {...a('ROOT')}>
    <Total {...{
      total: (
        results
        .map(({ fees }) => fees.reduce((p, c) => p + c))
        .reduce((p, c) => p + c)
      )
    }} />
    {results.map(({ name, fees, half_price }, key) =>
      <Result {...{
        key,
        name,
        total: fees.reduce((p, c) => p + c),
        fees,
        half_price
      }} />
    )}
  </div>

const Total = ({ total }) =>
  <div {...a('TOTAL_ROOT')}>
    <span>{`合計 ￥${total}`}</span>
    <span {...a('NO_TAX')}>{`(価格は税抜き)`}</span>
  </div>

const Result = ({ name, total, fees, half_price }) =>
  <div {...a('RESULT_ROOT')}>
    <div>{`${name} ￥${total}`}</div>
    <div>{fees.length >= 2 && createDetails({ fees, half_price })}</div>
  </div>

const createDetails = ({ fees, half_price }) =>
  fees.map((fee, index) =>
    <span {...a('FEE_DETAIL', { key: index })}>
      {index !== 0
        ? ` + ￥${fee}`
        : half_price
        ? `￥${fee}(半額)`
        : `￥${fee}`}
    </span>
  )

const a = Atra({
  ROOT: {
    style: {
      marginTop: 90,
      textAlign: 'left',
      fontSize: 54
    }
  },

  TOTAL_ROOT: {
    style: {
      marginTop: 18
    }
  },

  NO_TAX: {
    style: {
      fontSize: '0.4em',
      marginLeft: 20,
      verticalAlign: 'middle'
    }
  },

  RESULT_ROOT: {
    style: {
      fontSize: '0.58em',
      marginTop: 18
    }
  },

  FEE_DETAIL: {
    style: {
      fontSize: '0.85em',
      verticalAlign: 'super'
    }
  }
})
