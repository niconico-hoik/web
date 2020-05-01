import pluginImgAs from './imgas.js'
import { parseFromString, nodes2array } from '../util.js'

export const processSync = (html) =>
  execPluginsSync(parseFromString(html).body, [
    pluginTargetBlank,
    // pluginTbodyModify
  ])
  .innerHTML

export const processAsync = (html, reference) =>
  execPluginsAsync(parseFromString(html).body, reference, [
    pluginTargetBlank,
    // pluginTbodyModify,
    pluginImgAs
  ])
  .then(body => body.innerHTML)

const execPluginsSync = (body, plugins) => {
  plugins.splice(0, 1)[0](body)
  return !plugins.length ? body : execPluginsSync(body, plugins)
}

const execPluginsAsync = (body, reference, plugins) =>
  Promise.resolve(plugins.splice(0, 1)[0])
  .then(plugin => plugin(body, reference))
  .then(() => !plugins.length ? body : execPluginsAsync(body, reference, plugins))


const pluginTargetBlank = (body) =>
  nodes2array(body.querySelectorAll('a'))
  .forEach(a => a.target = '_blank')


const pluginTbodyModify = (body) =>
  nodes2array(body.querySelectorAll('tbody'))
  .forEach(tbody =>
    nodes2array(tbody.childNodes)
    .map(tr => nodes2array(tr.childNodes))
    .forEach(tdArray =>
      tdArray.length > 2 &&
      tdArray.forEach((td, index, { length }) =>
        index === length - 1
        ? td.style.fontSize = '0.8em'
        : td.style.whiteSpace = 'nowrap'
      )
    )
  )