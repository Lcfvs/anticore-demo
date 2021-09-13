import { load } from '../../../lib/renderer.js'

export default await load(import.meta, {}, {
  data: {
    counter: 0
  }
})
