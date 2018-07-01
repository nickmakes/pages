const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libName = 'nickmakes-pages';

const mode = env => (env.build ? 'production' : 'development');
const entry = env =>
  env.build
    ? ['./src/index.tsx']
    : [
        'react-hot-loader/patch', // activates HMR for React
        'webpack-dev-server/client?http://0.0.0.0:8001', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/index.tsx'
      ];
const output = env => {
  const filename = env.build ? 'bundle.min.js' : 'bundle.js';
  return {
    filename,
    path: path.resolve(__dirname, 'dist')
  };
}
const devtool = env => env.build ? 'cheap-source-map' : 'inline-source-map';
const plugins = env => {
  const htmlPlugin = new HTMLWebpackPlugin({
    template: path.join(__dirname, 'index.html'),
    filename: 'index.html',
    inject: 'body'
  });

  const definePlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(mode(env)),
      REPO_GIT_REV: JSON.stringify(process.env.REPO_GIT_REV),
      DB_VERSION: JSON.stringify(process.env.DB_VERSION),
      JS_SDK_VERSION: JSON.stringify(process.env.JS_SDK_VERSION),
      UI_VERSION: JSON.stringify(process.env.npm_package_version)
    }
  });

  if (env.build) {
    // return [htmlPlugin, definePlugin, new UglifyJsPlugin({ sourceMap: true })];
    return [htmlPlugin, definePlugin];
  }

  return [
    htmlPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    definePlugin
  ];
};

module.exports = (env = {}) => ({
  mode: mode(env),
  entry: entry(env),
  output: output(env),
  devtool: devtool(env),
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg/,
        loader: ['svg-url-loader']
      },
      {
        test: /.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap=true' },
          { loader: 'less-loader?sourceMap=true' }
        ]
      },
      {
        test: /favicon\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: plugins(env),
  devServer: {
    host: '0.0.0.0',
    port: 8001,
    historyApiFallback: true, // respond to 404s with index.html
    hot: true, // enable HMR on the server
    progress: true // show compilation progress
  }
});
