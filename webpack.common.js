const path = require('path');

module.exports = {
  entry: {
    '/Admin/admin': './src/Admin.js', 
    '/static/Scripts/home': './src/Home.js',
  },
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