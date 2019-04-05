const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String
});