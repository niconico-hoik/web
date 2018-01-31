// @flow
export const numToArr = (num) => [...numToArrG(num)]

function* numToArrG(num) {
  let from = 0
  while (from < num) {
    yield
    from++
  }
}

export const widthToSome = ({ baseWidth, length, marginRatio }) => {
  const prePercent = 100 / length
  const surplus = prePercent * marginRatio

  const widthPercent = prePercent - surplus
  const marginPercent = surplus / 2

  const width = baseWidth * (widthPercent * 0.01)
  const margin = baseWidth * (marginPercent * 0.01)
  return { width, margin }
}