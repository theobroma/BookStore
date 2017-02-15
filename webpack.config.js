const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

var configs = {
  entry: path.resolve(__dirname, 'client/index'),
  output: {
    path: path.resolve(__dirname, 'server/public/build'),
    filename: 'bundle.js',
    publicPath: './'
  },
  watch: isDevelopment,
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: [/node_modules/, /public/]
    }, {
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
      exclude: [/node_modules/, /public/]
    }, {
      test: [/\.jsx?$/, /\.es6$/],
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'server/shared')
      ],
      exclude: [/node_modules/, /bower_components/],
      /*loaders: ['react-hot-loader', 'babel-loader']*/
      /* loaders: ["babel-loader", "eslint-loader"]*/
      loader: 'babel-loader'
    }, {
      test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000'
    }, {
      test: /\.((ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|otf|eot)$/, loader: 'file'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
  devtool: isDevelopment ? 'cheap-module-source-map' : null,
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin('bundle.css', {
      disable: false
    })
  ]
};

if (!isDevelopment) {
  configs.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: { warnings: false },
      sourceMap: false
    })
  )
}

module.exports = configs;
