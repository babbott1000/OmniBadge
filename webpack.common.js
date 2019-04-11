const path = require('path');

module.exports = {
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /(\.js$)|(\.jsx$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: '[name].min.js',
  }
};