// @flow
import React from 'react'
import Atra from 'atra'

type Props = {
  feed(): any,
  renderDetail(): any,
  give(): any,
  back(): any,
}

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
      this.setState({ done, posts })
    }
  }

  render(){
    return (
      <div>
        {Object.entries(this.state.posts).map(([ym,posts], index) =>
          <div key={index}>
            <div>{ym}</div>
            {posts.map(({ photo, summary }, index) => {
              const size = innerWidth * 0.4
              const imgSize = size * 0.9
              return (
                <div {...{
                  key: index,
                  onClick: () => this.props.renderDetail({ ym, index }),
                  style: {
                    display: 'inline-block',
                    position: 'relative',
                    width: size,
                    height: size * 1.17,
                    margin: '5%',
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                    // borderStyle: 'outset'
                  }
                }}>
                  <img {...{
                    src: photo,
                    style: {
                      display: 'inline-block',
                      margin: imgSize * 0.05,
                      width: imgSize,
                      height: imgSize,
                      objectFit: 'cover'
                      // height: 100
                    }
                  }} />
                  <span {...{
                    style: {
                      fontSize: '1.6em',
                      visibility: !summary && 'hidden'
                    }
                  }}>{summary || '.'}</span>
                </div>
              )
            })}
          </div>
        )}

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