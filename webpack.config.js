const outputDir = __dirname + '/dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: outputDir,
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: '/node_modules',
      loader: 'babel-loader',
      query: {
        presets:['react','es2015']
      }
    },{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1
          }
        }
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'src'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}];

