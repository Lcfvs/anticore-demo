export const all = (selector, target = globalThis.document) =>
  [...target.querySelectorAll(selector)]

export const one = (selector, target = globalThis.document) =>
  target.querySelector(selector)
