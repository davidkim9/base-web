const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    hot: true,
  },
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',
  },
  mode: 'development', // Change this to use env vars
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};
