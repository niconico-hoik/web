// @flow
import React from 'react'
import Atra from 'atra'

const wrapRatio = 0.98
const imgMargin = 6
const imgWidth = (length) => ((window.innerWidth * wrapRatio) / length) - imgMargin * 2

export default class Detail extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div {...{
        // className: 'markdown-body',
        style: {
          width: `${wrapRatio * 100}%`,
          margin: "40px auto 20px"
        }
      }}>

        <div {...{
          style: {
            fontSize: '2.4em',
            width: '80%',
            marginLeft: '5%',
            letterSpacing: 4
          }
        }}>
          {this.props.caption}
        </div>

        {this.props.layouts.map((photos) =>
          photos.map(({ src, vertically }, index) => {
            const layoutLength = this.props.layouts.length
            const photosLength = photos.length

            const width = imgWidth(photosLength)
            const height = layoutLength === 1 && photosLength === 1
              ? width * 0.7
              : photosLength === 1
              ? width * 0.6
              : width

            return <img {...{
              key: index,
              src,
              onClick: () => this.props.setPopdown({ src, vertically }),
              style: {
                width,
                height,
                objectFit: "cover",
                margin: `${imgMargin - 2}px ${imgMargin}px`
              }
            }} />
          })
        )}

        {this.props.layouts.map((photos) =>
          photos.map((src, index) =>
            <img {...{
              key: index,
              src,
              onLoad: () => console.log(src),
              style: {
                height: 0,
                visibility: "hidden"
              }
            }} />
          )
        )}

      </div>
    )
  }
}

const a = Atra({

})