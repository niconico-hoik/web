const captionalTagNames = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p'
]

export const body2caption = (bodyDOM) =>
  Array.from(bodyDOM.childNodes)
  .filter(({ tagName }) => tagName)
  .map(({ tagName, innerHTML }) => {
    const tag = tagName.toLowerCase()
    return captionalTagNames.includes(tag)
    ? `<${tag}>${innerHTML}</${tag}>`
    : ''
  })
  .join('')

export const extractTitle = (bodyDOM) =>
  bodyDOM.innerHTML.includes('<h1') ? bodyDOM.querySelector('h1').innerText :
  bodyDOM.innerHTML.includes('<h2') ? bodyDOM.querySelector('h2').innerText :
  undefined