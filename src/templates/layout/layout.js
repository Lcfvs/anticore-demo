import template from '../../lib/template.js'
import ping from '../sse/ping/ping.js'

export default await template(import.meta, {
  ping,
  view: null
})
