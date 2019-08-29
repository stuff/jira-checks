const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const VERSION = require('./package.json').version;

const config = {
  context: __dirname,

  entry: {
    task: './src/task.js',
    board: './src/board.js',
    options: './src/options/index.js',
    testEdit: './src/test-edit.js'
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  },

  optimization: {
    minimize: false, // disabled because Firebase SDK once minimized can't be loaded by Chrome extension manager for "utf8" reasons...
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          priority: 10,
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new CopyWebpackPlugin([
      {
        from: 'ressources/**/*',
        flatten: true,
        transform: function(content, path) {
          if (path.match(/manifest\.json/)) {
            content = content.toString().replace(/<<version>>/g, VERSION);
          }
          return content;
        }
      }
    ]),

    new webpack.DefinePlugin({
      VERSION: JSON.stringify(VERSION),
      BUILD_DATE: JSON.stringify(new Date().toString())
    }),

    new WebpackAutoInject({
      // options
      // example:
      components: {
        AutoIncreaseVersion: false
      }
    })
  ]
};

module.exports = config;
