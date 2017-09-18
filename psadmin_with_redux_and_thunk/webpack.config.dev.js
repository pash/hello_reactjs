import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,                                    // enabled displaying debug info
  devtool: 'inline-source-map',                   // one of many options for dev tools; check docs for other options
  noInfo: false,                                  // setting to false means webpack with list all files its bundling
  entry: [
    'eventsource-polyfill',                       // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true',  // will reload the page if hot module reloading fails
    path.resolve(__dirname, 'src/index')          // app's entry point; should be specified last!
  ],
  target: 'web',                                  // webpack will bundle code where browser understands; check docs for other options
  output: {                                       // confusing: in dev, it will not generate physical files, but will create it in memory
    path: __dirname + '/dist',                    // physical files are only output by the production build task `npm run build`
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),     // enable to replace modules without doing full browser refresh
    new webpack.NoErrorsPlugin()                  // helps keep errors from breaking hot reload experience
  ],
  module: {                                       // tells webpack what types of files it'll handle
    loaders: [                                    // the last 4 are necessary for bootstrap fonts
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
