import React from 'react'
import { Post as Button } from 'ligure-tool/button'
import { tumblr } from 'ligure-tool/api'
// import Exhibit from './Exhibit.jsx'
// import Detail from './Detail.jsx'

const head = 'Notice'

const create = async ({ renderDetail, setPopdown, setInform }) => {
  await setInform(1)
  return {
    Exhibit: () => <div />,
    Detail: () => <div />
  }
}

export default { head, Button, create }

// import React from 'react'
// import { tumblr } from 'ligure-tool/api'
//
// // const account = 'kthjm'
// // const OPTS = { type: "photo" }
// // const account = "nicohoi-info"
// // const OPTS = { type: "text" }
//
// export default class Notice {
//   constructor(api_key) {
//     this.done = false
//     this.posts = []
//     this.api_key = api_key
//   }
//
//   async init() {
//     this.feed = await tumblr.PostsRandom({
//       account: "kthjm",
//       api_key: this.api_key,
//       query: { type: "quote" },
//       limit: 20
//       // timeout: 10000,
//     })
//
//     await this.update()
//     return
//   }
//
//   async update() {
//     const { done, res } = await this.feed()
//     this.done = done
//     // res.posts.forEach((post) => this.posts.push(post))
//     res.response.posts.forEach((post) => this.posts.push(post))
//     console.log(this.posts);
//     return
//   }
//
//   Exhibit({ detailing, updating }) {
//     return (
//       <div>
//         {this.posts.map(({ post_url }, index) =>
//           <div {...{
//             key: index,
//             onClick: detailing,
//             "data-detail": index,
//             style: {
//               margin: 100,
//               fontSize: 50
//             }
//           }}>
//             {post_url}
//           </div>
//         )}
//         <div {...{
//           onTouchEnd: updating,
//           style: {
//             margin: 100
//           }
//         }}>
//           {"updating"}
//         </div>
//       </div>
//     )
//   }
//
//   Detail({ data, poping }) {
//     const postIndex = +data
//     const src = this.posts[postIndex].photos[0].original_size.url
//     return <div>
//       <img {...{
//         onClick: poping,
//         src,
//         "data-hoge": src
//       }} />
//     </div>
//   }
// }
