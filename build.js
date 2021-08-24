import { argv } from 'process'
import { build } from 'esbuild'

const dev = argv.includes('--watch')

await build({
  entryPoints: {
    'js/dist': 'src/assets/js/main.js',
    'css/dist': 'src/assets/css/style.css'
  },
  bundle: true,
  format: 'esm',
  minify: !dev,
  watch: dev && {
    onRebuild (error, result) {
      if (error) {
        console.error('Watch build failed:', error)
      } else {
        console.log('Watch build succeeded:', result)
      }
    },
  },
  outdir: 'src/assets'
})
