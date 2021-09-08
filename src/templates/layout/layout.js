import { readFile } from 'fs/promises'
import template from '../../lib/template.js'
import ping from '../sse/ping/ping.js'

const importmap = `${await readFile('./production.importmap')}`

export default await template(import.meta, {
  importmap,
  ping,
  view: null
})
