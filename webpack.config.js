const outputDir = __dirname + '/dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  entry: [
    './src/index.js'
  ],
  output: {
    path: outputDir,
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules',
      loader: 'babel-loader',
      query: {
        presets:['react','es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'src'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}];

