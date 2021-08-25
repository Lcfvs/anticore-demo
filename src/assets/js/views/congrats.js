import { one } from '../utils/selectors.js'

export default element => {
  one('h1', element).classList.add('success')
}
