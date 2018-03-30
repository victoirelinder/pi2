'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MailSchema = new Schema({
  _id: String,
  bcc:[],
  cc:[],
  ctype: String,
  date: String,
  fname: String,
  folder: String,
  fpath: String,
  mid: String,
  recipients:[],
  replyto:Null,
  sender: String,
  subject: String,
  text: String,
  to:[],
});

module.exports = mongoose.model('Mail', MailSchema);
