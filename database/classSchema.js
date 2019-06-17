const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./userSchema.js');

module.exports = new mongoose.Schema({
  teacher: userSchema,
  room: String,
});