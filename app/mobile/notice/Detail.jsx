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
          // margin: "40px auto 20px"
          margin: "auto"
        }
      }}>

        <div {...{
          style: {
            fontSize: '2.4em',
            width: '80%',
            margin: "auto",
            // marginLeft: '5%',
            letterSpacing: 4
          }
        }}>
          {this.props.body}
        </div>

      </div>
    )
  }
}

const a = Atra({

})