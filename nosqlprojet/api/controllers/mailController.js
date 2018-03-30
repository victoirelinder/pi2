'use strict';

var mongoose = require('mongoose'),
  Mail = mongoose.model('Mail');

exports.getAllMails = function(req, res) {
  Mail.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.getMailQuery = function(req, res) {
  var query1 = req.body;
  var queryFinal = Film.find(query1).limit(50);
  queryFinal.exec(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.addMail = function(req, res) {
  var newMail = new Mail(req.body);
  newMail.save(function(err, data) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ message: 'Mail successfully added' });
    }
  });
};

exports.deleteMail = function(req, res) {
  var query = req.body;
  Mail.remove(query, function(err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Mail successfully deleted' });
  });
};
