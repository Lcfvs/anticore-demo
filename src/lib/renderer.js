import * as renderer from 'anticore-server/renderer.js'
import error from '../templates/error/error.js'
import fragment from '../templates/fragment/fragment.js'
import layout from '../templates/layout/layout.js'

export const sse = renderer.sse({ error })

export const view = renderer.view({ error, fragment, layout })
