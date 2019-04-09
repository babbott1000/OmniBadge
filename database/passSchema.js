const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./userSchema.js');

module.exports =  new mongoose.Schema({
  startTime: Date,
  duration: Number,
  expiration: Date,
  origin: String,
  teacher: userSchema,
  destination: String,
  return: Boolean,
  student: userSchema,
});