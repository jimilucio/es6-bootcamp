/* global __dirname */
import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

var _appSource = path.resolve(__dirname, 'source');
var _appBuild = path.resolve(__dirname, 'public');

module.exports = {
    entry: path.resolve(_appSource, 'main.js'),
    output: {
        path: _appBuild,
        filename: 'bundle.js'
      },
    devServer: {
        contentBase: _appBuild,
      },
    module: {
        loaders: [
      {
            test: _appSource,
            loaders: ['babel-loader', 'eslint-loader']
          },
      {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
          },
      {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
          },
      {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
          },
      {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
          },
      {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
          }
    ]
      },
    plugins: [

      // Simply copies the files over
      new CopyWebpackPlugin([
        {from: _appSource} // to: output.path
      ]),

      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin()
    ],
    stats: {

        // Nice colored output
        colors: true

      },

    // Create Sourcemaps for the bundle
    devtool: 'source-map'

  };
