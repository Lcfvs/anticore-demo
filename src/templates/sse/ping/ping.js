import template from '../../../lib/template.js'

export default await template(import.meta, {
  data: {
    counter: 0
  }
})
