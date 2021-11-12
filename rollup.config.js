const { nodeResolve } = require('@rollup/plugin-node-resolve')
// const commonjs = require('@rollup/plugin-commonjs')
const scss = require('rollup-plugin-scss')
const path = require('path')
const babel = require('rollup-plugin-babel')
const { merge, keys } = require('lodash')
const { dependencies } = require('./package.json')

const extensions = ['.ts']

const resolve = function (...args) {
  return path.resolve(__dirname, ...args)
}

const default_config = {
  plugins: [
    nodeResolve(),
    scss(),
    babel({
      exclude: 'node_modules/**',
      extensions,
      runtimeHelpers: true,
    }),
  ],
}

module.exports = [
  {
    input: resolve('src/index.ts'),
    output: {
      file: 'lib/index.esm.js',
      format: 'esm',
      exports: 'auto',
    },
    external: keys(dependencies),
  },
  {
    input: resolve('src/index.ts'),
    output: {
      file: 'lib/index.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    external: keys(dependencies),
  },
  {
    input: resolve('src/index.ts'),
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'Tour',
    },
  },
  {
    input: resolve('src/index.scss'),
    output: {
      file: 'lib/index.css',
    },
  },
].map((config) => merge(config, default_config))
