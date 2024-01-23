import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import { rimrafSync } from 'rimraf'

rimrafSync('./dist')

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
    typescript(),
  ],
})
