const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'client')
  }
};