import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { argv } from 'process'
import { pathToFileURL } from 'url'

const { href } = pathToFileURL('src')

const watched = argv.includes('-w')

export default [
  {
    input: 'src/assets/js/main.js',
    output: {
      file: 'src/assets/js/dist.js',
      format: 'es'
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      {
        resolveImportMeta(property, { moduleId }) {
          const path = pathToFileURL(moduleId).href.replace(href, '')

          return `{ url: new URL('${path}', globalThis.location).href }`
        }
      },
      ...watched ? [] : [terser()]
    ]
  },
  {
    input: 'src/assets/css/style.css',
    output: {
      file: 'src/assets/css/dist.css',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        minimize: !watched
      })
    ]
  }
]
