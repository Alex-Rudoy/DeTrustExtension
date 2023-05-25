const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    script: path.resolve('./src/script/index.ts'),
    popup: path.resolve('./src/popup/index.tsx'),
    background: path.resolve('./src/background/index.ts'),
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'var',
    library: 'DeTrust',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
    }),
    new HtmlWebpackPlugin({
      title: 'DeTrust Plugin',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
};
