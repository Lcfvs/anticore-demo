import { serve } from 'anticore-server/server.js'
import app from './lib/app.js'
import './routes/index.js'

await serve(app)
