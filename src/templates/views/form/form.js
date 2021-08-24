import template from '../../../lib/template.js'

export default await template(import.meta, {
  class: 'form',
  description: 'A page which asks you for a response, using a form',
  title: 'Form title',
  data: null,
  errors: null
})
