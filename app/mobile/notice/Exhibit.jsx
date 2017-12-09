// @flow
import React from 'react'
import Atra from 'atra'

type Props = {}

type State = {
  posts: Array<*>,
  done: boolean
}

export default class Exhibit extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.give()
    this.update = async () => {
      const { done, posts } = await this.props.feed(this.state.posts)
      console.log(posts);
      this.setState({ done, posts })
    }
  }

  render(){
    return (
      <div>
        {this.state.posts.map(({ summary, date, isNew, season }, index) => {
          const size = innerWidth * 0.4
          return <div key={index} {...{
            onClick: () => {
              // const clicked = this.state.posts[index]
              // console.log(clicked.isNew);
              // if(clicked.isNew){
              //   clicked.isNew = false
              // }
              // console.log(clicked.isNew);
              // this.props.setInform()
              this.props.renderDetail(index)
            },
            style: {
              backgroundColor: '#ffffff',
              position: 'relative',
              display: 'inline-block',
              width: size,
              height: size * 1.4,
              margin: '5%'
            }
          }}>
            <img {...{
              src: this.props.seasons[season],
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }
            }} />
            <span {...{
              style: {
                position: "absolute",
								top: 90,
								left: "43.7%",
								writingMode: "vertical-rl",
								// fontSize: "2em",
								fontSize: "2.2vh",
								letterSpacing: 2.5
              }
            }}>{summary}</span>
            <span {...{
              style: {
                position: "absolute",
                top: 4,
                left: 4
              }
            }}>{date}</span>
            {isNew && <span {...{
              style: {
                position: 'absolute',
                top: 4,
                right: 4
              }
            }}>{`new!!`}</span>}
          </div>
        })}

      {!this.state.done && (
          <div {...{
            onClick: this.update,
            style: {
              textAlign: "center",
              margin: 120,
              fontSize: 30
            }
          }}>
            {"update"}
          </div>
        )}
      </div>
    )
  }

  componentWillUnmount(){ this.props.back(this.state) }

}

const a = Atra({

})