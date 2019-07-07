const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

let devtool, plugins;
let entry = { index: ['./src/index.js'] };
let hints = 'warning';
let output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].bundle.js',
  publicPath: '/dist/',
};

if (isProduction === false) {
  entry.index.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  output.hotUpdateChunkFilename = '.hot/[id].[hash].hot-update.js';
  output.hotUpdateMainFilename = '.hot/[hash].hot-update.json';
  devtool = 'inline-source-map';
  hints = false;
  plugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()];
}

module.exports = {
  devtool,
  devServer: {
    contentBase: './www',
    hot: true,
  },
  entry,
  output,
  performance: {
    hints,
  },
  mode: isProduction === true ? 'production' : 'development',
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
  plugins,
};
