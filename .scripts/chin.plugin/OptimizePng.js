import imagemin from 'imagemin'
import pngquant from 'imagemin-pngquant'

export default opts => data =>
  imagemin.buffer(data, {
    plugins: [
      pngquant({
        // floyd: :number | :boolean,
        // nofs: :boolean,
        // posterize: :string,
        // quality: :string,
        // speed: :number,
        // verbose: true
      })
    ]
  })
