import { renderToStaticMarkup } from 'react-dom/server'
import { outputFile } from 'fs-extra'
import { htmlToFormat } from '../util.js'

export default class Bomb {
  constructor(opts) {
    this._component = opts.component
    this._path = opts.outpath
    this._requires = opts.requires
    this._props = {}
  }

  setProp(name, prop) {
    if (!this._requires.includes(name)) {
      throw new Error(`what this name => ${name}`)
    }

    this._props[name] = prop
    return this._isready() && this._out()
  }

  _isready() {
    return this._requires.every(key => this._props[key])
  }

  _out() {
    return outputFile(this._path, renderHtml(this._component(this._props)))
  }
}

const renderHtml = elements =>
  htmlToFormat(`
  <!DOCTYPE html>
  ${renderToStaticMarkup(elements)}
`)
