const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
    popup: './src/popup.ts',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'var',
    library: 'DeTrust',
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
