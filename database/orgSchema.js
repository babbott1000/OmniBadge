const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./userSchema.js');
const passesSchema = require('./passSchema.js');
const classSchema = require('./classSchema.js');

module.exports = new mongoose.Schema({
  members: [ userSchema ],
  settings: {
  	expirationTime: Number,
  },
  classes: [ classSchema ],
  passes: [ passSchema ],
  role: String
});