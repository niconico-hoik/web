window.onerror = e => {
  document.body.removeChild(document.getElementById('app'))
  const div = document.createElement('div')
  div.innerText = e
  div.style.fontSize = '40px'
  document.body.appendChild(div)
}
