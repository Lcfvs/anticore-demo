import { setTimeout } from 'timers/promises'
import app from '../lib/app.js'
import { sse } from '../lib/renderer.js'
import ping from '../templates/sse/ping/ping.js'

app.get('/ping', async (request, reply) => {
  const event = sse(reply)

  const data = {
    counter: 0
  }

  while (!reply.raw.writableEnded) {
    data.counter += 1
    await event('ping', data.counter, ping, { data })
    await setTimeout(1000)
  }
})
