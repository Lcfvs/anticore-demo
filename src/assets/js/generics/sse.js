import { sse } from '../dist.js'

const sources = new WeakMap()

const types = ['checkbox', 'radio']

const listen = target => sse(target.dataset.sse)

const onChange = ({ target }) => {
  if (target.checked) {
    sources.set(target, listen(target))
  } else {
    sources.get(target).close()
    sources.delete(target)
  }
}

export default target => {
  if (types.includes(target.type)) {
    target.addEventListener('change', onChange, { passive: true })
    onChange({ target })
  } else {
    listen(target)
  }
}
