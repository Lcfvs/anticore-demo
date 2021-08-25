import { listen } from '../dist.js'

const highlight = ({ target: { classList }, type }) => {
  if (type === 'focus') {
    classList.add('highlighted')
  } else {
    classList.remove('highlighted')
  }
}

export default element => {
  listen('focus', element, highlight, { passive: true })
  listen('blur', element, highlight, { passive: true })
}
