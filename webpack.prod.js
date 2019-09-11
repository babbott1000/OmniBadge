const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

var standardConfig = merge(common, {
  entry: {
    'home': './src/Home.js',
    'pass': './src/Pass.js',
    'create': './src/Create.js',
    'about': './src/About.js',
    'errorNotFound': './src/ErrorNotFound.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'client/static/scripts'),
    filename: '[name].min.js',
  }
});

var adminConfig = merge(common, {
  entry: {
    'admin': './src/Admin.js'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'client/admin'),
    filename: '[name].min.js',
  }
});

module.exports = [
    standardConfig, adminConfig,       
];