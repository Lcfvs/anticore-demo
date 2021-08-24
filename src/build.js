import { rollup } from 'rollup'
import multi from '@rollup/plugin-multi-entry'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { argv } from 'process'

const dev = argv.includes('--open')

const config = {
  input: {
    input: ['src/assets/js/main.js'],
    plugins: [
      multi({
        entryFileName: 'js/dist.js'
      }),
      nodeResolve({
        browser: true,
      }),
      postcss({
        extract: 'css/dist.css',
        minimize: !dev
      })
    ]
  },
  output: {
    dir: 'src/assets',
    format: 'es',
    plugins: [
      dev || terser()
    ]
  }
}

const bundle = await rollup(config.input)
await bundle.write(config.output)
await bundle.close()
