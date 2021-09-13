import { load } from '../../../lib/renderer.js'

export default await load(import.meta, {}, {
  class: 'home',
  description: 'A homepage page which contains an anchor to access to the form',
  title: 'An anticore starter micro-website'
})
