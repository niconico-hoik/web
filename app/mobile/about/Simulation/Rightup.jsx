import React from 'react'
import Atra from 'atra'

export default ({
  selects,
  resulting,
  onChange,
  onClick
}) =>
  <div {...a('right_wrap')}>

    {Object.entries(selects).map(
      ([selectKey,selectValue]) =>
        Array.isArray(selectValue)
        ? selectValue.map(
          (selectValue, ageIndex, ages) =>
            <Select {...{
              key: ageIndex,
              selectKey,
              selectValue,
              onChange,
              ageIndex,
              ages
            }} />
          )
        : <Select {...{
          key: selectKey,
          selectKey,
          selectValue,
          onChange
        }} />
    )}

    {!resulting && <Button {...{ onClick }} />}

  </div>

const Select = ({
  selectKey,
  selectValue,
  onChange,
  ageIndex,
  ages
}) => {

  const template = templates[selectKey]
  const { before, after, beforeExcludeFirst, afterExcludeLast } = template

  const isAge = typeof ageIndex === 'number' && ages.length > 1
  const beforeText = (!isAge || ageIndex === 0) ? before : beforeExcludeFirst
  const afterText = (!isAge || ageIndex === ages.length - 1) ? after : afterExcludeLast

  return (
    <div {...a('select_div')}>

      <span>{beforeText}</span>

      <select {...a('select', {
        onChange,
        value: selectValue,
        ['data-name']: selectKey,
        ['data-index']: ageIndex
      })}>
        {template.options.map(({ value, children }) => <option {...{ key: value, children, value }} />)}
      </select>

      <span>{afterText}</span>

    </div>
  )
}

const Button = ({ onClick }) =>
  <div {...a('button_wrap')}>
    <button {...a('button', { onClick })}>
      {"計算する"}
    </button>
  </div>

const a = Atra({
  right_wrap: {
    style: {
      textAlign: 'right'
      // marginRight:30
    }
  },

  select_div: {
    style: {
      marginTop: 18
    }
  },

  select: {
    style: {
      fontSize: 50,
      textAlign: 'right',
      paddingLeft: 15,
      paddingRight: 10,
      borderStyle: 'none',
      color: 'rgb(76, 97, 135)',
      background: 'rgba(0,0,0,0)'
    }
  },

  button_wrap: {
    style: {
      marginTop: 90
      // marginRight:44
      // marginRight:20
      // textAlign:"right"
    }
  },

  button: {
    onTouchStart: e => { e.target.style.borderStyle = 'inset' },
    onTouchEnd: e => { e.target.style.borderStyle = 'outset' },
    style: {
      fontSize: 38,
      padding: '18px 40px 18px',
      background: 'rgb(251, 251, 251)',
      color: 'rgb(125, 124, 122)',
      borderWidth: 4,
      borderStyle: 'outset'
    }
  }
})

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
  age: {
    before: '(',
    beforeExcludeFirst: '',
    options: [
      { value: 8000, children: '3才以上' },
      { value: 11000, children: '2才以下' }
    ],
    afterExcludeLast: 'と',
    after: ')を'
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