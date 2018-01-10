import React from 'react'

export const DEVELOPMENT = ({ onerror }) =>
  <html lang="ja">
    <head>
      {onerror}
    </head>
    <body>
      <div id="app" />
      <script src="./dll.js" />
      <script src="./bundle.js" />
    </body>
  </html>

export const PRODUCTION_LIGHT = ({ onerror }) =>
  <html lang="ja">
    <head>
      {onerror}
    </head>
    <body>
      <div id="app" />
      <script src="./bundle.js" />
    </body>
  </html>

export const PRODUCTION_MASTER = ({ favicons, ganalytics }) =>
  <html lang="ja">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
      <title>ニコニコ保育園 和泉中央園</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="Content-Script-Type" content="text/javascript" />
      <meta httpEquiv="Content-Style-Type" content="text/css" />
      <meta name="keywords" content="ニコニコ保育園,大阪,和泉市,いずみ,のぞみ野,保育園,ほいくえん,保育,ほいく,認可外,一時預かり,一時" />
      <meta name="description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」を保育方針に日々を励むニコニコ保育園 和泉中央園は2016年11月にのぞみ野の2丁目から3丁目へと少しだけ場所を変えてリスタートしました" />
      <meta name="fragment" content="!" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:url" content="https://niconico-hoik.com" />
      <meta property="og:site_name" content="niconico-hoik.com" />
      <meta property="og:image" content="./image/opengraph.png" />
      <meta property="og:title" content="ニコニコ保育園 和泉中央園" />
      <meta property="og:description" content="「子どもの持つ多彩な可能性が育まれるようサポートすること」、以上でも以下でもない当園の保育方針です" />
      {favicons}
      {ganalytics}
    </head>
    <body>
      <div id="app" />
      <script src="./bundle.js" />
    </body>
  </html>