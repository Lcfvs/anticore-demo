import { on, sse } from 'anticore'

// matching any sse target and turn it to EventSource
on('body:not(.anticore) [data-sse]', element => {
  sse(element.dataset.sse)
})
