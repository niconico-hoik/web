import imagemin from 'imagemin'
import jpegtran from 'imagemin-jpegtran'

export default opts => data =>
  imagemin.buffer(data, {
    plugins: [
      jpegtran({
        progressive: true
        // arithmetic: true
      })
    ]
  })
