import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { outputFile } from 'fs-extra'
import { htmlToFormat } from '../util.js'

const renderStaticHtml = elements =>
  htmlToFormat(`
  <!DOCTYPE html>
  ${renderToStaticMarkup(elements)}
`)

export default class Bomb {
  constructor(opts) {
    this._component = opts.component
    this._path = opts.outpath
    this._requires = opts.requires
    this._props = {}
  }

  setProp(name, prop) {
    if (!this._requires.includes(name)) {
      throw new Error(`htmlBomb: what this name => ${name}`)
    }

    this._props[name] = prop

    if(this._isready()) {
      this._out()
    }
  }

  _isready() {
    return this._requires.every(key => Boolean(this._props[key]))
  }

  _out() {
    const Component = this._component
    const elements = <Component {...this._props}/>
    const html = renderStaticHtml(elements)
    return outputFile(this._path, html)
  }
}