import { defaults, when } from 'anticore'

when('form input, form select, form textarea', import.meta, '/assets/js/generics/highlight.js')
when('body:not(.anticore) [data-sse]', import.meta, '/assets/js/generics/sse.js')

defaults()
