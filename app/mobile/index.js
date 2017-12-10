import React from 'react'
import preprops from '../props.json'
import about from './about'
import home from './home'
import notice from './notice'
import photo from './photo'
import { WaveLoading } from 'ligure-tool/preloader'

const props = Object.assign({}, preprops)

props.exhibitBg[0] = './image/top.mobile.jpg'

props.Preloader = () => <WaveLoading {...{ size: 200 }} />

props.views = [
  home,
  about,
  photo,
  // photo,
  // photo,
  notice
]

props.sides.unshift({
  href: 'tel:0725563396',
  buttonImage: './image/tel.png'
})

export default props
