const merge = require('webpack-merge');
const path = require('path');
var common = require('./webpack.common.js');

var devServer = {
  devServer: {
    contentBase: ['./client/static', './client/Admin'],
  },
}
common = merge(common, devServer)
var standardConfig = merge(common, {
  entry: {
    'home': './src/Home.js',
    'pass': './src/Pass.js',
    'create': './src/Create.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'client/static/scripts'),
    filename: '[name].min.js',
  }
});

var adminConfig = merge(common, {
  entry: {
    'admin': './src/Admin.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'client/admin'),
    filename: '[name].min.js',
  }
});

module.exports = [
    standardConfig, adminConfig,       
];