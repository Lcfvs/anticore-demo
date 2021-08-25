import { defaults, when } from 'anticore'

when('form input, form select, form textarea', import.meta, '../generics/highlight.js')
when('body:not(.anticore) [data-sse]', import.meta, '../generics/sse.js')

defaults()
