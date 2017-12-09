import React from 'react'

export default ({
  favicons,
  onerror,
  ganalytics,
  dll
}) =>
  <html lang="ja">
    <head>
      <title>{'title'}</title>
      {favicons}
      {onerror}
      {/* {props.ganalytics} */}
    </head>
    <body>
      <div id="app" />
      {dll}
      <script src="./bundle.js" />
    </body>
  </html>