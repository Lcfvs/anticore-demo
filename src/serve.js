import { serve } from 'anticore-server/server.js'
import { argv } from 'process'
import open from 'open'
import app from './lib/app.js'
import './routes/index.js'

const port = await serve(app)

if (argv.includes('--open')) {
  await open(`http://127.0.0.1:${port}`)

  console.log(`Your app is listening on port ${port}`)
}
