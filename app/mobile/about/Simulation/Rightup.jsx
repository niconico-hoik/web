import React from 'react'
import Atra from 'atra'

export default ({
  selects,
  onChange,
  buttonable,
  onClick
}) =>
  <div {...a('ROOT')}>
    {createSelects({ onChange, selects })}
    {buttonable && <Button {...{ onClick }} />}
  </div>

const createSelects = ({ onChange, selects }) =>
  Object.entries(selects).map(([selectName,selectValue]) =>
    Array.isArray(selectValue)
    ? createAges({ onChange, selectName, ages: selectValue })
    : <Select {...{
      key: selectName,
      beforeText: templates[selectName].before,
      onChange,
      selectName,
      selectValue,
      options: templates[selectName].options,
      afterText: templates[selectName].after
    }} />
  )

const createAges = ({ onChange, selectName, ages }) => {
  const { before, after, beforeExZero, afterExLast, options } = templates.ages
  return ages.map((selectValue, agesIndex) =>
    <Select {...{
      key: agesIndex,
      beforeText: ages.length > 1 && agesIndex !== 0 ? beforeExZero : before,
      onChange,
      selectName,
      selectValue,
      agesIndex,
      options,
      afterText: ages.length > 1 && agesIndex !== ages.length - 1 ? afterExLast : after
    }} />
  )
}

const Select = ({
  beforeText,
  onChange,
  selectValue,
  selectName,
  agesIndex,
  options,
  afterText
}) =>
  <div {...a('SELECT_ROOT')}>
    <span>{beforeText}</span>
    <select {...a('SELECT', {
      onChange,
      value: selectValue,
      'data-name': selectName,
      'data-age-index': typeof agesIndex === 'number' && agesIndex
    })}>
      {options.map(({ value, children }) => <option {...{ key: value, children, value }} />)}
    </select>
    <span>{afterText}</span>
  </div>

const Button = ({ onClick }) =>
  <div {...a('BUTTON_ROOT')}>
    <button {...a('BUTTON', { onClick })}>
      {'計算する'}
    </button>
  </div>

const a = Atra({
  ROOT: {
    style: {
      textAlign: 'right'
    }
  },

  SELECT_ROOT: {
    style: {
      marginTop: 18
    }
  },

  SELECT: {
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

  BUTTON_ROOT: {
    style: {
      marginTop: 90
    }
  },

  BUTTON: {
    onTouchStart: e => {
      e.target.style.borderStyle = 'inset'
    },
    onTouchEnd: e => {
      e.target.style.borderStyle = 'outset'
    },
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
  ages: {
    before: '(',
    beforeExZero: '',
    options: [
      { value: 8000, children: '3才以上' },
      { value: 11000, children: '2才以下' }
    ],
    afterExLast: 'と',
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
