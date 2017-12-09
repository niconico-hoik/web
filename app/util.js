// @flow
export const api_key = 'DKLtEG9dqbcYUnCSz0eKDtbPTjLUJ1m84uG47mNxbLoKtItW5u'
// export const summaryLength = 12
export const createGiveAndBack = (store) => ({
  give: () => store,
  back: (state) => Object.keys(store).forEach((key) => { store[key] = state[key] })
})