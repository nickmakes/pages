const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libName = 'mmdb-client-factory';

module.exports = (env = {}) => ({
  mode: env.build ? 'production' : 'development',
  entry: __dirname + '/src/index.ts',
  devtool: env.build ? 'cheap-source-map' : 'inline-source-map',
  output: {
    filename: libName + (env.build ? '.min.js' : '.js'),
    path: path.resolve(__dirname, 'dist/web'),
    library: libName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
        exclude: /node_modules/
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.ts', '.js']
  },
  plugins: env.build ? [new UglifyJsPlugin({ sourceMap: true })] : []
});
