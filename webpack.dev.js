const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'admin': './src/Admin.js', 
    'static/Home/home': './src/Home.js',
    'static/Pass/pass': './src/Pass.js',
    'static/Create/create': './src/Create.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client'
  }
});
