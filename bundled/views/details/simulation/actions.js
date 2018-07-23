import { numToArr } from './util.js'

export default {
  NUMBER_ON_CHANGE: ({ payload: target, state, setState }) => {
    const agesLength = +target.value
    state('ages').then(ages =>
      setState({ ages: numToArr(agesLength).map((n, index) => ages[index] || 'toddler') })
    )
  },
  AGE_ON_CHANGE: ({ payload: target, state, setState }) => {
    const ageIndex = +target.dataset.ageIndex
    const ageValue = target.value
    state('ages').then(Array.from).then(ages => {
      ages[ageIndex] = ageValue
      setState({ ages })
    })
  },
  VALUE_ON_CHANGE: ({ payload: target, setState }) => {
    const name = target.dataset.name
    const value = +target.value
    setState({ [name]: value })
  }
}