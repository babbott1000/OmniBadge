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
  }
};