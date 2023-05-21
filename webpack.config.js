const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    moda: './src/index.ts',
  },
  output: {
    path: `${__dirname}/dist/src`,
    filename: 'moda/moda.js',
    publicPath: '/',
    libraryTarget: 'var',
    library: 'Moda',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
};
