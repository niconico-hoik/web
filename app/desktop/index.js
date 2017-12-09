import preprops from '../props.json'
import about from './about'
import home from './home'
import notice from './notice'
import photo from './photo'

const props = Object.assign({}, preprops)

props.views = [home, about, photo, notice]

export default props
