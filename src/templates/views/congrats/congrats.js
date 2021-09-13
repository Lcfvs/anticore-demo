import { load } from '../../../lib/renderer.js'

export default await load(import.meta, {}, {
  class: 'congrats',
  description: 'A page which congrats you for your response',
  title: 'Congratulations'
})
