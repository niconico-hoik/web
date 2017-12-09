;(() => {
  const script = document.createElement('script')
  const which = navigator.userAgent.toLowerCase().includes('mobile')
    ? 'mobile'
    : 'desktop'
  script.type = 'text/javascript'
  script.src = `./${which}.js`
  document.body.appendChild(script)
})()
