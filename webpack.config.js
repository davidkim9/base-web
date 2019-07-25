const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let devtool, scssLoaders, plugins, styleLoaders;
const development = process.env.NODE_ENV !== 'production';

scssLoaders = [
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer()]
    }
  },
  'sass-loader'
];

if (development === true) {
  // Development
  devtool = 'inline-source-map';
  styleLoaders = [
    'style-loader',
    ...scssLoaders
  ];
  plugins = [new webpack.HotModuleReplacementPlugin()];
} else {
  // Production  
  styleLoaders = [{
      loader: MiniCssExtractPlugin.loader,
    },
    ...scssLoaders
  ];
  plugins = [new MiniCssExtractPlugin({
    filename: 'style.css'
  })];
}


module.exports = {
  devtool,
  devServer: {
    contentBase: './www',
    hot: development
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  mode: development ? 'development' : 'produdction',
  module: {
    rules: [{
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
        test: /\.(sa|sc|c)ss$/,
        use: styleLoaders,
      },
    ],
  },
  plugins
};