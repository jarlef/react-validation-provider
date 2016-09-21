var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3005',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      babelrc: false, 
      loader: require.resolve('babel-loader'),
      include: [path.join(__dirname, 'src'), path.join(__dirname, '/../src')],
      query: {
          presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-stage-0'), require.resolve('babel-preset-react')],
          plugins: [require.resolve('babel-plugin-transform-decorators-legacy')]
      }
    }, 
    { test: /\.css$/, loader: "style-loader!css-loader" },
    {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
    }]
  },
   resolve: {
        root: [
            path.resolve(__dirname, 'src'), // so we can avoid ../../../ syntax
            path.resolve(__dirname, 'node_modules'),
            //path.resolve(__dirname, '..') // so we can import { someModule } from 'my_parent_directory_modules';
        ],
        extensions: ['', '.js', '.es', '.jsx']
    }
};