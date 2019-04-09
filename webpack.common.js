const path = require('path');

module.exports = {
  entry: {
    Admin: './src/Admin.js', 
    Home: './src/Home.js'
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
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'client/Scripts')
  }
};