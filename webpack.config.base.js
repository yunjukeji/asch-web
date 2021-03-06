const path = require('path')

const { CheckerPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const libName = 'asch-web'


let baseConfig = {
  mode: 'development',
  entry: './src/index-build.ts',
  target: 'node',
  output: {
    filename: libName,
    path: path.resolve(__dirname, 'dist/webpack'),
    libraryTarget: 'commonjs',
  },

  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new CheckerPlugin()
  ]
}

let targets = ['web', 'node', 'async-node'].map((target) => {
  
  let config = webpackMerge(baseConfig, {
    target: target,
    output: {
      filename: libName + '.' + target,
      libraryTarget: target==='web'?'umd':'commonjs',
    }
  })
  return config
})

module.exports = targets
