const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'admin': './src/Admin.js', 
    'static/home/scripts/home': './src/Home.js',
    'static/home/scripts/pass': './src/Pass.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client'
  }
});
