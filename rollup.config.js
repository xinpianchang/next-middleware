import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

const extensions = ['.js', '.ts']

const plugins = [
  resolve({
    extensions,
    preferBuiltins: false,
  }),
  commonjs({ sourceMap: false }),
]

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => id !== '@babel/runtime' && pattern.test(id)
}

// CommonJS
const cjs = {
  input: 'src/index.ts',
  output: {
    dir: './',
    format: 'cjs',
    indent: false,
    exports: 'default',
  },
  external: makeExternalPredicate([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
  plugins: [
    ...plugins,
    babel({
      extensions,
      include: ['src/**/*'],
      babelHelpers: 'bundled',
    }),
  ],
}

module.exports = [cjs]
