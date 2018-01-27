import photo from './photo.js'
import video from './video.js'
import text from './text.js'
const transforms = { photo, video, text }
export default (post) => transforms[post.type](post)