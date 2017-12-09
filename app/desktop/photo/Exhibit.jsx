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
    console.log(this.state);
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
            {posts.map((post, index) =>
              <img {...{
                key: index,
                src: post.photos[0].original_size.url,
                onClick: () => this.props.renderDetail({ ym, index }),
                style: {
                  width: "50%",
                  // height: 100
                }
              }} />
            )}
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