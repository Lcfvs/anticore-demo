import app from '../lib/app.js'
import { view } from '../lib/renderer.js'
import home from '../templates/views/home/home.js'

app.get('/', async (request, reply) => {
  return view(reply, home)
})
