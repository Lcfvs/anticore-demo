import * as responder from 'anticore-server/responder.js'
import error from '../templates/error/error.js'
import fragment from '../templates/fragment/fragment.js'
import layout from '../templates/layout/layout.js'

export const sse = responder.sse({ error })

export const view = responder.view({ error, fragment, layout })
