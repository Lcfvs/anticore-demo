import app from '../lib/app.js'
import { view } from '../lib/renderer.js'
import form from '../templates/views/form/form.js'
import congrats from '../templates/views/congrats/congrats.js'

app.get('/form', async (request, reply) => {
  return view(reply, form)
})

app.post('/form', async ({ body }, reply) => {
  if (body.result === '2') {
    return view(reply, congrats)
  }

  return view(reply, form, {
    data: body,
    errors: {
      result: new Error('Wrong answer')
    }
  })
})
