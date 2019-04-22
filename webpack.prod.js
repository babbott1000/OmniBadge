const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    '/Admin/admin': './src/Admin.js', 
    '/static/scripts/home': './src/Home.js',
    '/static/scripts/pass': './src/Pass.js',
    '/static/scripts/create': './src/Create.js',
  },
  mode: 'production',
});