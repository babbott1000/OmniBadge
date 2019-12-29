const merge = require('webpack-merge');
const path = require('path');
var common = require('./webpack.common.js');

var devServer = {
  devServer: {
    contentBase: [ path.join(__dirname,'client/static'), path.join(__dirname,'client/Admin') ]
  },
  mode: 'development',
  devtool: 'inline-source-map',

}
var dev = merge(common, devServer)
var standardConfig = merge(dev, {
  entry: {
    'home': './src/Home.js',
    'create': './src/Create.js',
    'about': './src/About.js',
    'errorNotFound': './src/ErrorNotFound.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/static/scripts'),
    filename: '[name].min.js',
  }
});

var adminConfig = merge(dev, {
  entry: {
    'admin': './src/Admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/admin'),
    filename: '[name].min.js',
  }
});

module.exports = [
    standardConfig, adminConfig
];