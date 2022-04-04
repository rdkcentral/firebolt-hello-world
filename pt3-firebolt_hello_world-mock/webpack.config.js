const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './public/index.js',
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.pug',
      hash: true,
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'static', to: 'static'},
          { from: 'scripts', to: 'scripts'},
      ]
  })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      }
    ]
  },
  devServer: {
    open: true,
    liveReload: true
  }
}