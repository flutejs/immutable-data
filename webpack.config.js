var webpack = require('webpack')


module.exports = {
  entry: {
    index:'./src/index.js'
  },

  module: {
    loaders: [
      { 
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          stage:0
        }
      }
      ,
      { 
        test:/\.jison$/,
        loader: 'jison-loader'
      }
    ]
  },
  output: {
    path: "./lib",
    filename: '[name].js',
    libraryTarget:'commonjs2',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]

}