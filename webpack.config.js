const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  plugins: [new webpack.ProgressPlugin()],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/docs',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/],
      },
      {
        test: /.css$/,

        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { path: require.resolve('path-browserify') },
  },

  devServer: {
    port: 9000,
    compress: true,
    contentBase: path.join(__dirname, 'docs'),
    allowedHosts: [''],
  },

  plugins: [
    new CleanWebpackPlugin({
      root: __dirname + '/docs',
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['main.js'],
    }),
  ],
};
