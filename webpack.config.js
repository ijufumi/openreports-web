var outputDir = __dirname + '/dist';
module.exports = [{
  entry: [
    './websrc/index.js'
  ],
  output: {
    path: outputDir,
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [{
      exclude: '/node_modules'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: outputDir
  }
}];

