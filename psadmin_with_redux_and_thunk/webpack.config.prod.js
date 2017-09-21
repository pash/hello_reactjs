import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  debug: true,                                    // enabled displaying debug info
  devtool: 'source-map',                          // one of many options for dev tools; check docs for other options
  noInfo: false,                                  // setting to false means webpack with list all files its bundling
  entry: path.resolve(__dirname, 'src/index'),    // app's entry point; should be specified last!
  target: 'web',                                  // webpack will bundle code where browser understands; check docs for other options
  output: {                                       // confusing: in dev, it will not generate physical files, but will create it in memory
    path: __dirname + '/dist',                    // physical files are only output by the production build task `npm run build`
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(), // optimizes the order that our files are bundled in for optimal minification
    new webpack.DefinePlugin(GLOBALS),            // lets us define variables that are then made available to the libraries that Webpack is bundling
    new ExtractTextPlugin('styles.css'),          // lets us extract our css into a separate file which would generate a physical file which we need to setup in html
    new webpack.optimize.DedupePlugin(),          // eliminiates duplicate packages
    new webpack.optimize.UglifyJsPlugin()         // minimizes js
  ],
  module: {                                       // tells webpack what types of files it'll handle
    loaders: [                                    // the last 4 are necessary for bootstrap fonts
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap")},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
