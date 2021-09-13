import { load } from '../../../lib/renderer.js'

export default await load(import.meta, {}, {
  class: 'form',
  description: 'A page which asks you for a response, using a form',
  title: 'Form title',
  data: null,
  errors: null
})
