const path = require('path');

module.exports = {
  entry: {
    admin: './src/admin.js',  
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
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'client')
  }
};