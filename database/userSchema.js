const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  teacher: Boolean,
  owner: Boolean,
});