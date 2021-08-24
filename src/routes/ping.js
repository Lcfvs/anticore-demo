import app from '../lib/app.js'
import { sse } from '../lib/renderer.js'
import ping from '../templates/sse/ping/ping.js'

const wait = async delay => new Promise(resolve => setTimeout(resolve, delay))

app.get('/ping', async (request, reply) => {
  const event = sse(reply)

  const data = {
    counter: 0
  }

  while (!reply.raw.writableEnded) {
    data.counter += 1
    await event('ping', data.counter, ping, { data })
    await wait(1000)
  }
})
