import React from 'react'
import { internalHtml } from 'lonogara-tool/toreact'

const { assign } = Object

export default src =>
  fetch(src)
  .then(res => res.text())
  .then(html => internalHtml(html, {
    imgas: { reference: src },
    components
  }))

const components = {
  tbody: (props) => <tbody {...recreateTbodyProps(props)} />
}

const recreateTbodyProps = (props) => {
  props = assign({}, props)
  props.children = props.children.map((tr) => recreateTr(tr))
  return props
}

const recreateTr = (tr) => {
  tr = assign({}, tr)
  tr.props = assign({}, tr.props)
  tr.props.children = tr.props.children.map(
    (td, index, { length }) =>
      length <= 2
      ? td
      : index !== length - 1
      ? recreateTdExceptLast(td)
      : recreateTdOnlyLast(td)
  )
  return tr
}

const recreateTdExceptLast = (td) => {
  td = assign({}, td)
  td.props = assign({}, td.props)
  td.props.style = assign({}, td.props.style)
  td.props.style.whiteSpace = 'nowrap'
  return td
}

const recreateTdOnlyLast = (td) => {
  td = assign({}, td)
  td.props = assign({}, td.props)
  td.props.style = assign({}, td.props.style)
  td.props.style.fontSize = '0.8em'
  return td
}