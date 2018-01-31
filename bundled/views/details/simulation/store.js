import Orph from 'orph'
import { numToArr } from './util.js'

export default (initialState) => {

  const store = new Orph(initialState)

  store.register({
    NUMBER_ON_CHANGE: (e, { state, render }) => {
      const agesLength = +e.target.value
      state('ages').then((ages) =>
        render({
          ages: numToArr(agesLength).map((n, index) => ages[index] || 'toddler')
        })
      )
    },
    AGE_ON_CHANGE: (e, { state, render }) => {
      const ageIndex = +e.target.dataset.ageIndex
      const ageValue = e.target.value
      state('ages').then((ages) => {
        ages[ageIndex] = ageValue
        render({ ages })
      })
    },
    VALUE_ON_CHANGE: (e, { render }) => {
      const name = e.target.dataset.name
      const value = +e.target.value
      render({ [name]: value })
    }
  },{
    use: {
      state: true,
      render: true
    }
  })

  return store
}