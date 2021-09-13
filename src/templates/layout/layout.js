import { readFile } from 'fs/promises'
import { load } from '../../lib/renderer.js'
import ping from '../sse/ping/ping.js'

const importmap = `${await readFile('./production.importmap')}`

export default await load(import.meta, {}, {
  importmap,
  ping,
  view: null
})
