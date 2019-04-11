const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    '/Admin/admin': './src/Admin.js', 
    '/static/Scripts/home': './src/Home.js',
  },
  mode: 'production',
});