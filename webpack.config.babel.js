/* global __dirname */

import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

var _appSource = path.resolve(__dirname, 'source');
var _appBuild = path.resolve(__dirname, 'build');

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
              loader: 'babel-loader',
              test: _appSource,
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
  devtool: 'source-map',
};
